'use client';

import dynamic from 'next/dynamic';

const UploadView = dynamic(() => import('./UploadView'), { ssr: false });

export default function UploadPage() {
  return <UploadView />;
}
