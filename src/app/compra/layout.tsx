'use client';

import React from 'react';
import { CompraProvider } from './context';
import Header from '@/components/Header';

export default function CompraLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-black text-gray-100 font-display antialiased selection:bg-primary selection:text-black min-h-screen md:p-4 flex flex-col md:block">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&display=swap');
                
                :root {
                    --bg-dark: #0b0f12;
                    --primary: #00ff7f;
                }

                body {
                    background-color: var(--bg-dark);
                }

                /* Layout specific for compra flow */
                @media (max-width: 768px) {
                    .mobile-content-wrapper {
                        height: calc(100vh - 84px);
                        display: flex;
                        flex-direction: column;
                    }
                    .mobile-scroll-area {
                        flex: 1;
                        overflow-y: auto;
                        min-height: 0;
                    }
                }
            `}</style>

            <CompraProvider>
                {children}
            </CompraProvider>
        </div>
    );
}
