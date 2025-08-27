'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, EyeOff, CalendarClock, Trash2, LoaderCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useGeneratePassword, useGetPasswords, useRevokePassword } from '@/app/admin/(main)/catalogue/api/passwords';

const PasswordManagerPage = () => {
	const [visiblePasswordId, setVisiblePasswordId] = useState<string | null>(null);

	// --- TanStack Query Hooks ---
	const { data: passwords, isLoading, isError, error } = useGetPasswords();
	const { mutate: generate, isPending: isGenerating } = useGeneratePassword();
	const { mutate: revoke } = useRevokePassword();

	const handleRevoke = (passwordId: string) => {
		if (window.confirm('Are you sure you want to revoke this secret code? This action cannot be undone.')) {
			revoke({ passwordId });
		}
	};

	return (
		<div className="space-y-12 p-4 md:p-8 text-foreground">
			{/* --- Header & Generator Button --- */}
			<section className="flex flex-col md:flex-row justify-between md:items-center gap-4">
				<div className="flex items-center gap-3">
					<ShieldCheck className="w-8 h-8 text-primary" />
					<div>
						<h1 className="text-3xl font-bold">Secret Code HQ</h1>
						<p className="text-white/60">Manage secure access codes for administrative tasks.</p>
					</div>
				</div>
				<motion.button onClick={() => generate()} disabled={isGenerating} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-wait">
					{isGenerating ? (
						<LoaderCircle size={20} className="animate-spin" />
					) : (
						<>
							<Sparkles size={16} />
							<span>Generate New Code</span>
						</>
					)}
				</motion.button>
			</section>

			{/* --- Password Table --- */}
			<section className="p-4 rounded-lg bg-custom-gradient border border-border">
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead className="border-b border-border/50">
							<tr>
								<th className="p-4 font-normal text-white/70">Secret Code</th>
								<th className="p-4 font-normal text-white/70">Created At</th>
								<th className="p-4 font-normal text-white/70">Expires At</th>
								<th className="p-4 font-normal text-white/70 text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{isLoading && (
								<tr>
									<td colSpan={4} className="text-center p-16">
										<LoaderCircle className="w-8 h-8 mx-auto animate-spin text-primary" />
									</td>
								</tr>
							)}
							{isError && (
								<tr>
									<td colSpan={4} className="text-center p-16">
										<div className="flex flex-col items-center gap-2 text-red-400">
											<AlertTriangle size={32} />
											<span className="font-semibold">Failed to load codes</span>
											<span className="text-sm">{error?.message || 'Error'}</span>
										</div>
									</td>
								</tr>
							)}
							{!isLoading && !isError && passwords?.length === 0 && (
								<tr>
									<td colSpan={4} className="text-center p-16 text-white/50">
										<p>No active secret codes found. Generate one to get started! 🚀</p>
									</td>
								</tr>
							)}
							{!isLoading &&
								passwords?.map(p => (
									<tr key={p._id} className="border-b border-border/20 last:border-none hover:bg-accent/20 transition-colors">
										<td className="p-4">
											<div className="flex items-center gap-4">
												<span className="font-mono tracking-wider">{visiblePasswordId === p._id ? p.password : '••••••••'}</span>
												<motion.button whileTap={{ scale: 0.9 }} onClick={() => setVisiblePasswordId(visiblePasswordId === p._id ? null : p._id)} className="text-white/70 hover:text-primary">
													{visiblePasswordId === p._id ? <EyeOff size={16} /> : <Eye size={16} />}
												</motion.button>
											</div>
										</td>
										<td className="p-4 text-white/70">{new Date(p.createdAt).toLocaleString()}</td>
										<td className="p-4 text-white/70">
											<div className="flex items-center gap-2">
												<CalendarClock size={14} />
												<span>{new Date(p.expiresAt).toLocaleDateString()}</span>
											</div>
										</td>
										<td className="p-4 text-right">
											<motion.button whileHover={{ scale: 1.1, color: '#ef4444' }} whileTap={{ scale: 0.9 }} onClick={() => handleRevoke(p._id)} className="flex items-center gap-2 text-white/70 ml-auto">
												<Trash2 size={16} />
												<span className="max-sm:hidden">Revoke</span>
											</motion.button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
};

export default PasswordManagerPage;
