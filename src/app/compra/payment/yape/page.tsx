'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCompra } from '../../context';
import Layout from '../../components/Layout';

const YapeScreen = () => {
    const router = useRouter();
    const { banks, banksLoading } = useCompra();

    const walletData = banks.find((bank: any) => bank.type === 'wallet') || {
        name: 'Yape / Plin',
        holder: 'Ricardo Campos', // Fallback
        phone: '924722707',
        qr: null,
        logo: null
    };

    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        if (typeof navigator !== 'undefined') {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        }
    };

    return (
        <Layout currentStep={2}>
            <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">payments</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-white">Pagar con Yape/Plin</h2>
                </div>
            </div>
            
            <div className="p-4 md:p-8 flex flex-col items-center">
                {banksLoading ? (
                    <div className="w-full max-w-md h-64 bg-white/5 animate-pulse rounded-3xl" />
                ) : (
                    <div className="w-full max-w-sm md:max-w-md bg-gradient-to-br from-[#1e3a8a] to-[#1e1a5a] rounded-[32px] p-6 relative overflow-hidden border border-white/10 shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                            <div className="flex-1">
                                <div className="mb-4">
                                    {walletData.logo ? (
                                        <div className="w-16 h-16 rounded-xl bg-white p-2 mb-4">
                                            <img src={walletData.logo} alt={walletData.name} className="w-full h-full object-contain" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl bg-[#742384] flex items-center justify-center mb-4">
                                            <span className="text-white font-black italic text-sm">yape</span>
                                        </div>
                                    )}
                                    <p className="text-blue-200 text-sm mb-1">{walletData.holder}</p>
                                    <div 
                                        className="flex items-center gap-3 cursor-pointer group"
                                        onClick={() => handleCopy(walletData.phone || '')}
                                    >
                                        <span className="text-white font-black text-2xl tracking-tighter">{walletData.phone}</span>
                                        <span className="material-symbols-outlined text-blue-300 text-sm opacity-50 group-hover:opacity-100 transition-opacity">content_copy</span>
                                        {copied && <span className="text-[10px] text-green-400 font-bold uppercase animate-bounce">Copiado</span>}
                                    </div>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">{walletData.name}</h3>
                                <p className="text-blue-300/60 text-xs">Escanea el QR o usa el número celular para pagar.</p>
                            </div>

                            <div className="bg-[#742384] p-3 rounded-2xl shadow-xl mx-auto md:mx-0">
                                <div className="bg-white p-3 rounded-xl">
                                    {walletData.qr ? (
                                        <img src={walletData.qr} alt="QR Code" className="w-40 h-40 object-contain" />
                                    ) : (
                                        <div className="w-40 h-40 flex items-center justify-center bg-gray-100 relative opacity-40">
                                            <span className="material-symbols-outlined text-4xl text-black">qr_code_2</span>
                                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                                <div className="w-full h-full border-4 border-dashed border-black/10 rounded-lg"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl font-montserrat" />
                    </div>
                )}
            </div>

            <div className="p-4 md:p-6 border-t border-white/5 bg-black/40 flex flex-row justify-between gap-3 md:justify-end mt-auto">
                <button 
                    onClick={() => router.push('/compra')}
                    className="flex-1 md:flex-none px-8 py-3.5 rounded-xl border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/5 transition-colors"
                >
                    Anterior
                </button>
                <button 
                    onClick={() => router.push('/compra/upload')}
                    className="flex-1 md:flex-none px-10 py-3.5 rounded-xl bg-primary text-black font-black text-sm shadow-[0_4px_20px_rgba(0,255,127,0.3)] hover:scale-[1.02] transition-all active:scale-95"
                >
                    Siguiente
                </button>
            </div>
        </Layout>
    );
};

export default YapeScreen;
