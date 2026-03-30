import dynamic from 'next/dynamic';

const BankView = dynamic(() => import('./BankView'), { ssr: false });

export default function BankPage() {
  return <BankView />;
}
