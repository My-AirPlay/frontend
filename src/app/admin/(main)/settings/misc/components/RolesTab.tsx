'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';
import { useGetAdminRoles } from '../../api/queries';
import { useCreateAdminRole, useUpdateAdminRole, useDeleteAdminRole } from '../../api/mutations';

const ALL_PAGES = [
	{ key: 'dashboard', label: 'Dashboard' },
	{ key: 'contracts', label: 'Contracts' },
	{ key: 'tracks', label: 'Tracks' },
	{ key: 'catalogue', label: 'Catalogue' },
	{ key: 'sales', label: 'Sales' },
	{ key: 'sales_history', label: 'Sales History' },
	{ key: 'artist_revenue', label: 'Artist Revenue' },
	{ key: 'support', label: 'Support' },
	{ key: 'json', label: 'JSON Converter' },
	{ key: 'password_management', label: 'Password Management' }
];

export default function RolesTab() {
	const { data: roles = [], isLoading } = useGetAdminRoles();
	const createRole = useCreateAdminRole();
	const updateRole = useUpdateAdminRole();
	const deleteRole = useDeleteAdminRole();

	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [name, setName] = useState('');
	const [selectedPages, setSelectedPages] = useState<string[]>([]);

	const togglePage = (key: string) => {
		setSelectedPages(prev => (prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]));
	};

	const handleSave = () => {
		if (editingId) {
			updateRole.mutate(
				{ id: editingId, name, allowedPages: selectedPages },
				{
					onSuccess: () => {
						resetForm();
					}
				}
			);
		} else {
			createRole.mutate(
				{ name, allowedPages: selectedPages },
				{
					onSuccess: () => {
						resetForm();
					}
				}
			);
		}
	};

	const startEdit = (role: any) => {
		setEditingId(role._id);
		setName(role.name);
		setSelectedPages(role.allowedPages);
		setShowForm(true);
	};

	const resetForm = () => {
		setShowForm(false);
		setEditingId(null);
		setName('');
		setSelectedPages([]);
	};

	if (isLoading) return <div>Loading roles...</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold">Roles</h2>
				<Button onClick={() => (showForm ? resetForm() : setShowForm(true))} size="sm">
					{showForm ? 'Cancel' : 'Create Role'}
				</Button>
			</div>

			{showForm && (
				<div className="bg-secondary p-4 rounded-lg mb-6 space-y-4">
					<Input placeholder="Role Name" value={name} onChange={e => setName(e.target.value)} />
					<div>
						<p className="text-sm font-medium mb-2">Allowed Pages</p>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							{ALL_PAGES.map(page => (
								<label key={page.key} className="flex items-center gap-2 text-sm">
									<Checkbox checked={selectedPages.includes(page.key)} onCheckedChange={() => togglePage(page.key)} />
									{page.label}
								</label>
							))}
						</div>
					</div>
					<Button onClick={handleSave} disabled={createRole.isPending || updateRole.isPending || !name || selectedPages.length === 0}>
						{editingId ? 'Update Role' : 'Create Role'}
					</Button>
				</div>
			)}

			<div className="border border-border rounded-lg overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-secondary">
						<tr>
							<th className="text-left p-3 font-medium">Name</th>
							<th className="text-left p-3 font-medium">Pages</th>
							<th className="text-left p-3 font-medium">Users</th>
							<th className="text-left p-3 font-medium">Actions</th>
						</tr>
					</thead>
					<tbody>
						{roles.map((role: any) => (
							<tr key={role._id} className="border-t border-border">
								<td className="p-3">
									{role.name}
									{role.isDefault && <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Default</span>}
								</td>
								<td className="p-3 text-muted-foreground">{role.allowedPages.length} pages</td>
								<td className="p-3">{role.userCount}</td>
								<td className="p-3">
									<div className="flex gap-2">
										<Button size="sm" variant="outline" onClick={() => startEdit(role)}>
											Edit
										</Button>
										{!role.isDefault && (
											<Button size="sm" variant="outline" className="text-red-400 hover:text-red-300" onClick={() => deleteRole.mutate(role._id)} disabled={deleteRole.isPending}>
												Delete
											</Button>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
