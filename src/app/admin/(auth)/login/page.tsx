import { Metadata } from 'next';
import React from 'react';
import AdminLoginPageClient from '@/app/admin/(auth)/login/login.client';

export const metadata: Metadata = {
	title: 'Admin Login'
};

const AdminRoleLogin = () => {
	return <AdminLoginPageClient />;
};

export default AdminRoleLogin;
