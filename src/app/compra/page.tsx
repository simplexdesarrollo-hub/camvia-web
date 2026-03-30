'use client';

import dynamic from 'next/dynamic';

const SummaryView = dynamic(() => import('./SummaryView'), { ssr: false });

export default function SummaryPage() {
  return <SummaryView />;
}
