import React from 'react';
import { useGetAudios } from '../api/getArtisteMedias';
import AudioCard, { AudioCardSkeleton } from './AudioCard';
import { Button, SelectSimple } from '@/components/ui';

const SectionAudios = () => {
	const [itemsPerPage, setItemsPerPage] = React.useState(20);
	const [page, setPage] = React.useState(1);
	const { data, isLoading } = useGetAudios({
		page: page,
		limit: itemsPerPage
	});

	return (
		<div className="relative flex flex-col h-full overflow-hidden">
			<section className="flex-1 overflow-y-auto">
				{!isLoading && data?.data.length === 0 ? (
					<div className="flex items-center justify-center h-full w-full">
						<h1 className="text-xl text-muted-foreground">No audios found</h1>
					</div>
				) : (
					<div className="grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">{isLoading ? Array.from({ length: 10 }).map((_, index) => <AudioCardSkeleton key={`${_}${index}`} />) : data?.data.map(audio => <AudioCard key={audio._id} audio={audio} />)}</div>
				)}
			</section>

			<footer className="stickty top-0 gap-8 h-10 bg-background flex items-center justify-between mt-auto">
				<div className="flex items-center gap-2">
					<Button onClick={() => setPage(prev => prev - 1)} disabled={page === 1} size="sm" variant="outline" className={`px-4 !py-2  ${page === 1 && 'opacity-50 cursor-not-allowed'}`}>
						Previous
					</Button>
					<span className="min-w-[3ch] text-center ">{page}</span>
					<Button onClick={() => setPage(prev => prev + 1)} disabled={(data?.total ?? 0) <= itemsPerPage * page} size="sm" variant="outline" className={`px-4 !py-2  ${(data?.total ?? 0) <= itemsPerPage * page && 'opacity-50 cursor-not-allowed'}`}>
						Next
					</Button>
				</div>

				<div className="flex items-center gap-2">
					<p className="text-xs sm:text-sm">Items per page:</p>

					<SelectSimple
						value={String(itemsPerPage)}
						onChange={value => {
							setItemsPerPage(Number(value));
							setPage(1);
						}}
						options={[
							{ value: '10', label: '10' },
							{ value: '20', label: '20' },
							{ value: '50', label: '50' },
							{ value: '100', label: '100' }
						]}
						valueKey="value"
						labelKey="label"
						className="w-20 !h-7 !p-2"
						placeholder="Items per page"
						size={'sm'}
					/>
				</div>
			</footer>
		</div>
	);
};

export default SectionAudios;
