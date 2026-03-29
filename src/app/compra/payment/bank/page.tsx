'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCompra } from '../../context';
import Layout from '../../components/Layout';

const BankScreen = () => {
    const router = useRouter();
    const { banks, banksLoading } = useCompra();

    const bankData = banks.filter((bank: any) => bank.type === 'bank');

    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    
    const handleCopy = (text: string, key: string) => {
        if (typeof navigator !== 'undefined') {
            navigator.clipboard.writeText(text);
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 1600);
        }
    };

    const getBankColor = (bankName: string) => {
        const name = bankName.toLowerCase();
        if (name.includes('bcp')) return '#002A8D';
        if (name.includes('interbank')) return '#009E35';
        if (name.includes('bbva')) return '#004481';
        return '#1e3a8a';
    };

    return (
        <Layout currentStep={2}>
            <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">account_balance</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-white">Transferencia Bancaria</h2>
                </div>
            </div>
            
            <div className="p-4 md:p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {bankData.map((bank: any) => (
                        <div key={bank.id} className="p-6 rounded-3xl border border-white/10 bg-white/5 flex flex-col h-full hover:border-primary/20 transition-all group">
                            <div className="mb-4 flex items-center gap-4">
                                {bank.logo ? (
                                    <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg">
                                        <img src={bank.logo} alt={bank.name} className="w-full h-full object-contain" />
                                    </div>
                                ) : (
                                    <div 
                                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg text-white font-bold text-xs"
                                        style={{ backgroundColor: getBankColor(bank.name) }}
                                    >
                                        {bank.name.substring(0, 3).toUpperCase()}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h4 className="text-white font-bold leading-tight">{bank.holder}</h4>
                                    <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">{bank.name}</span>
                                </div>
                            </div>
                            
                            <div className="space-y-3 mt-auto pt-4 border-t border-white/5">
                                {bank.accountNo && (
                                    <div 
                                        className="flex items-center justify-between cursor-pointer group/item"
                                        onClick={() => handleCopy(bank.accountNo, `acc-${bank.id}`)}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Nº Cuenta</span>
                                            <span className="text-sm font-mono text-gray-300 tracking-wider">{bank.accountNo}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {copiedKey === `acc-${bank.id}` && <span className="text-[10px] text-green-400 font-bold uppercase animate-pulse">Copiado</span>}
                                            <span className="material-symbols-outlined text-gray-600 group-hover/item:text-primary transition-colors text-lg">content_copy</span>
                                        </div>
                                    </div>
                                )}
                                
                                {bank.cci && (
                                    <div 
                                        className="flex items-center justify-between cursor-pointer group/item"
                                        onClick={() => handleCopy(bank.cci, `cci-${bank.id}`)}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">CCI</span>
                                            <span className="text-sm font-mono text-gray-300 tracking-wider">{bank.cci}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {copiedKey === `cci-${bank.id}` && <span className="text-[10px] text-green-400 font-bold uppercase animate-pulse">Copiado</span>}
                                            <span className="material-symbols-outlined text-gray-600 group-hover/item:text-primary transition-colors text-lg">content_copy</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {banksLoading && bankData.length === 0 && (
                        Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="p-6 rounded-3xl border border-white/10 bg-white/5 h-48 animate-pulse" />
                        ))
                    )}
                </div>
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

export default BankScreen;
