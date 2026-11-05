'use client';

import React, { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ImportJobInfo } from '../../../catalogue/api/postAdminAnalyzeCsv';

export interface UploadProgress {
	loaded: number;
	total: number;
}

interface ImportProgressPanelProps {
	fileName?: string | null;
	/** Bytes sent to storage so far; null once the page has been reloaded. */
	upload: UploadProgress | null;
	uploadDone: boolean;
	/** The server accepted the file and queued it for processing. */
	queued: boolean;
	job?: ImportJobInfo;
	completed: boolean;
	/** When the upload started (ms), for the elapsed time. */
	startedAt: number | null;
}

type StageState = 'done' | 'active' | 'todo';

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
const pct = (part: number, whole: number | null | undefined) => (whole ? Math.min(100, Math.max(0, Math.round((part / whole) * 100))) : null);

function formatElapsed(ms: number) {
	const s = Math.max(0, Math.floor(ms / 1000));
	const m = Math.floor(s / 60);
	return m ? `${m}m ${String(s % 60).padStart(2, '0')}s` : `${s}s`;
}

/** Ticks every second so the elapsed time and "updated Xs ago" stay current. */
function useNow(active: boolean) {
	const [now, setNow] = useState(() => Date.now());
	useEffect(() => {
		if (!active) return;
		const t = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(t);
	}, [active]);
	return now;
}

const Stage = ({ state, title, detail, percent }: { state: StageState; title: string; detail?: React.ReactNode; percent?: number | null }) => (
	<li className={cn('flex gap-3 rounded-md bg-secondary p-3', state === 'todo' && 'opacity-60')}>
		<span className={cn('mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full', state === 'done' ? 'bg-primary text-white' : state === 'active' ? 'border-2 border-primary' : 'bg-accent')}>{state === 'done' ? <Check size={12} strokeWidth={3} /> : state === 'active' ? <Loader2 size={12} className="animate-spin text-primary" /> : null}</span>
		<div className="min-w-0 flex-1">
			<div className="flex items-baseline justify-between gap-2">
				<span className={cn('text-sm', state === 'active' && 'font-medium')}>{title}</span>
				{state === 'active' && percent != null && <span className="text-xs tabular-nums text-muted-foreground">{percent}%</span>}
			</div>
			{detail && <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>}
			{state === 'active' && percent != null && (
				<div className="mt-2 h-1 overflow-hidden rounded-sm bg-accent">
					<div className="h-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }} />
				</div>
			)}
		</div>
	</li>
);

/**
 * Shows where a sales CSV import is: uploading, waiting to start, reading the
 * file, then matching artists and saving tracks. Works without the server's
 * progress too (older backend): the reading and saving steps then just spin.
 */
const ImportProgressPanel: React.FC<ImportProgressPanelProps> = ({ fileName, upload, uploadDone, queued, job, completed, startedAt }) => {
	const now = useNow(!completed);
	const progress = job?.progress ?? null;

	const uploadPct = uploadDone ? 100 : upload ? pct(upload.loaded, upload.total) : null;
	const readPct = progress ? (progress.stage === 'saving' ? 100 : pct(progress.bytesRead, progress.totalBytes)) : null;
	const savePct = progress?.stage === 'saving' ? pct(progress.tracksDone, progress.tracksTotal) : null;

	const reading = !completed && queued && (progress ? progress.stage === 'reading' : job?.state === 'active' || !job);
	const saving = !completed && progress?.stage === 'saving';
	const waiting = !completed && queued && job?.state === 'waiting';

	const uploadState: StageState = uploadDone ? 'done' : 'active';
	// No `job` at all means a backend without progress reporting: treat it as started.
	const startState: StageState = completed || progress || job?.state === 'active' || (queued && !job) ? 'done' : uploadDone ? 'active' : 'todo';
	const readState: StageState = completed || saving ? 'done' : reading && startState === 'done' ? 'active' : 'todo';
	const saveState: StageState = completed ? 'done' : saving ? 'active' : 'todo';

	// Upload counts for a fifth of the bar, reading two fifths, saving two fifths.
	const overall = completed ? 100 : saving ? 60 + ((savePct ?? 0) * 40) / 100 : readState === 'active' ? 20 + ((readPct ?? 0) * 40) / 100 : uploadDone ? 20 : ((uploadPct ?? 0) * 20) / 100;

	const updatedAgo = progress?.at ? Math.round((now - progress.at) / 1000) : null;

	return (
		<div className="bg-background p-6 rounded-md max-w-3xl">
			<div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
				<h3 className="text-md font-medium">{completed ? 'Import complete' : 'Importing sales file'}</h3>
				{startedAt && <span className="text-xs tabular-nums text-muted-foreground">Elapsed {formatElapsed((completed ? (progress?.at ?? now) : now) - startedAt)}</span>}
			</div>
			{fileName && <p className="mb-3 truncate text-xs text-muted-foreground">{fileName}</p>}

			<div className="h-2 overflow-hidden rounded-sm bg-accent">
				<div className="h-full bg-primary transition-all duration-500" style={{ width: `${Math.round(overall)}%` }} />
			</div>
			<p className="mt-1 text-xs tabular-nums text-muted-foreground">{Math.round(overall)}% complete</p>

			<ol className="mt-5 space-y-2">
				<Stage state={uploadState} title="Upload the file" percent={uploadPct} detail={upload && !uploadDone ? `${mb(upload.loaded)} of ${mb(upload.total)}` : undefined} />
				<Stage state={startState} title={waiting ? 'Waiting for another import to finish' : 'Start processing'} detail={waiting ? 'Only one sales file is processed at a time. This one starts automatically.' : undefined} />
				<Stage state={readState} title="Read the file" percent={readState === 'active' ? readPct : null} detail={progress && readState !== 'todo' ? `${progress.rowsRead.toLocaleString()} rows${progress.totalBytes ? ` · ${mb(progress.bytesRead)} of ${mb(progress.totalBytes)}` : ''}` : readState === 'active' ? 'Reading the rows and adding up streams and royalties per track.' : undefined} />
				<Stage state={saveState} title="Match artists and save tracks" percent={savePct} detail={progress?.stage === 'saving' && progress.tracksTotal != null ? `${progress.tracksDone.toLocaleString()} of ${progress.tracksTotal.toLocaleString()} tracks` : undefined} />
			</ol>

			{!completed && updatedAgo != null && updatedAgo > 60 && <p className="mt-4 text-xs text-amber-500">No update for {formatElapsed(updatedAgo * 1000)}. It may still be working on a large track; if this lasts more than 10 minutes, check the server logs.</p>}
			{!completed && <p className="mt-4 text-xs text-muted-foreground">You can leave this page open; it updates every few seconds.</p>}
		</div>
	);
};

export default ImportProgressPanel;
