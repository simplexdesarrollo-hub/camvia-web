'use client';

import dynamic from 'next/dynamic';

const RegisterView = dynamic(() => import('@/components/auth/RegisterView'), { ssr: false });

export default function RegisterPage() {
  return <RegisterView />;
}
