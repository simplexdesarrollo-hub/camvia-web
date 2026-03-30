import dynamic from 'next/dynamic';

const YapeView = dynamic(() => import('./YapeView'), { ssr: false });

export default function YapePage() {
  return <YapeView />;
}
