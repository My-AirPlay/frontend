import { Metadata } from 'next';
import React from 'react';
import LoginPageClient from './login.client';
export const metadata: Metadata = {
	title: 'Login'
};

const RoleLogin = () => {
	return <LoginPageClient />;
};

export default RoleLogin;
