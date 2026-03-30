import dynamic from 'next/dynamic';

const LoginView = dynamic(() => import('@/components/auth/LoginView'), { ssr: false });

export default function LoginPage() {
  return <LoginView />;
}
