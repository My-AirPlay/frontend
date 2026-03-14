'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui';
import { useGetAdminUsers, useGetAdminRoles } from '../../api/queries';
import { useCreateAdminUser, useUpdateAdminUser, useResetAdminPassword } from '../../api/mutations';

export default function TeamTab() {
	const { data: users = [], isLoading } = useGetAdminUsers();
	const { data: roles = [] } = useGetAdminRoles();
	const createUser = useCreateAdminUser();
	const updateUser = useUpdateAdminUser();
	const resetPassword = useResetAdminPassword();

	const [showCreateForm, setShowCreateForm] = useState(false);
	const [form, setForm] = useState({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		roleId: ''
	});

	const handleCreate = () => {
		createUser.mutate(
			{
				email: form.email,
				firstName: form.firstName,
				lastName: form.lastName,
				password: form.password,
				...(form.roleId && { roleId: form.roleId })
			},
			{
				onSuccess: () => {
					setShowCreateForm(false);
					setForm({ email: '', firstName: '', lastName: '', password: '', roleId: '' });
				}
			}
		);
	};

	if (isLoading) return <div>Loading users...</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold">Team Members</h2>
				<Button onClick={() => setShowCreateForm(!showCreateForm)} size="sm">
					{showCreateForm ? 'Cancel' : 'Add Sub Admin'}
				</Button>
			</div>

			{showCreateForm && (
				<div className="bg-secondary p-4 rounded-lg mb-6 grid grid-cols-2 gap-4">
					<Input placeholder="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
					<Input placeholder="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
					<Input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
					<Input placeholder="Temporary Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
					<select className="bg-[#383838] text-foreground rounded-md border border-border px-3 py-2" value={form.roleId} onChange={e => setForm({ ...form, roleId: e.target.value })}>
						<option value="">Default Role</option>
						{roles.map((role: any) => (
							<option key={role._id} value={role._id}>
								{role.name}
							</option>
						))}
					</select>
					<Button onClick={handleCreate} disabled={createUser.isPending || !form.email || !form.firstName || !form.lastName || !form.password}>
						{createUser.isPending ? 'Creating...' : 'Create'}
					</Button>
				</div>
			)}

			<div className="border border-border rounded-lg overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-secondary">
						<tr>
							<th className="text-left p-3 font-medium">Name</th>
							<th className="text-left p-3 font-medium">Email</th>
							<th className="text-left p-3 font-medium">Role</th>
							<th className="text-left p-3 font-medium">Status</th>
							<th className="text-left p-3 font-medium">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user: any) => (
							<tr key={user._id} className="border-t border-border">
								<td className="p-3">
									{user.firstName} {user.lastName}
									{user.isSuperAdmin && <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Super Admin</span>}
								</td>
								<td className="p-3 text-muted-foreground">{user.email}</td>
								<td className="p-3">{user.role?.name || '—'}</td>
								<td className="p-3">
									<span className={`text-xs px-2 py-0.5 rounded ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{user.status}</span>
								</td>
								<td className="p-3">
									{!user.isSuperAdmin && (
										<div className="flex gap-2">
											<Button
												size="sm"
												variant="outline"
												onClick={() =>
													updateUser.mutate({
														id: user._id,
														status: user.status === 'Active' ? 'Inactive' : 'Active'
													})
												}
											>
												{user.status === 'Active' ? 'Deactivate' : 'Activate'}
											</Button>
											<Button
												size="sm"
												variant="outline"
												onClick={() => {
													const pwd = prompt('Enter new temporary password:');
													if (pwd) resetPassword.mutate({ id: user._id, newPassword: pwd });
												}}
											>
												Reset Password
											</Button>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
