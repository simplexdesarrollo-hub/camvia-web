'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useCompra } from './context';
import Layout from './components/Layout';

const SummaryScreen = () => {
    const { 
        paymentMethod, setPaymentMethod, 
        selectedPlan, setSelectedPlan, 
        setSelectedBank, banks, 
        appliedCoupon, setAppliedCoupon, 
        resetCompraState 
    } = useCompra();

    const [user, setUser] = useState<User | null>(null);
    const [couponInput, setCouponInput] = useState('');
    const [couponError, setCouponError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();

    // Sincronizar usuario
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return () => unsubscribe();
    }, []);

    // Sincronizar el contexto con el plan que viene de la navegación o query params
    useEffect(() => {
        const queryId = searchParams.get('id');
        const queryQty = searchParams.get('qty');
        
        if (queryId && queryQty) {
            // Si viene de parámetros de búsqueda (como desde eventos)
            // Normalmente buscaríamos el plan en una lista, pero por ahora lo construimos o lo buscamos
            // Asumimos que setSelectedPlan ya maneja el objeto correcto
            setSelectedPlan({
                id: parseInt(queryId),
                name: 'Tickets de Sorteo', // Fallback si no tenemos el nombre real
                price: 5 * parseInt(queryQty),
                qtyEntered: parseInt(queryQty),
                unitPrice: 5,
                type: 'Ticket'
            });
        }
    }, [searchParams, setSelectedPlan]);

    // Determinar qué plan mostrar
    const plan = selectedPlan || {
        name: 'Plan Diamante',
        price: 45.00,
        type: 'Plan',
        features: [
            'Sorteos semanales',
            'Puntos x1.5',
            'Acceso inmediato',
            'Soporte priority'
        ]
    };

    const getMonthlyPrice = (plan: any) => {
        if (plan.type === 'Points') return `${plan.qtyEntered || 0} Puntos`;
        if (plan.type === 'Diamonts') return `${plan.qtyEntered || 0} Diamantes`;
        if (plan.type === 'Ticket') return `Cantidad: ${plan.qtyEntered || 0}`;
        if (plan.months === 1) return 'Pago único 1 mes';
        const monthly = (plan.price / (plan.months || 1)).toFixed(2);
        return `Equivale S/ ${monthly}/mes`;
    };

    const handleApplyCoupon = async () => {
        if (!couponInput) {
            setCouponError('Ingresa un cupón');
            return;
        }

        setIsVerifying(true);
        setCouponError('');

        try {
            const code = couponInput.toUpperCase().trim();
            // Simular validación de cupón
            if (code === 'PROMO10') {
                setAppliedCoupon({
                    code: code,
                    discount: 10
                });
                setCouponInput('');
            } else {
                setCouponError('Cupón no válido');
            }
        } catch (error) {
            setCouponError('Error al validar');
        } finally {
            setIsVerifying(false);
        }
    };

    const calculateTotal = () => {
        let total = plan.price;
        if (appliedCoupon) {
            total = Math.max(0, total - appliedCoupon.discount);
        }
        return total;
    };

    const finalPrice = calculateTotal();

    const handleNext = () => {
        if (finalPrice <= 0) {
            setShowSuccessModal(true);
            setTimeout(() => router.push('/account'), 2000);
            return;
        }

        // Seleccionar banco por defecto
        const selectedBankData = banks.find(bank => 
            paymentMethod === 'yape' ? (bank as any).type === 'wallet' : (bank as any).type === 'bank'
        );
        setSelectedBank(selectedBankData || null);

        if (paymentMethod === 'yape') {
            router.push('/compra/payment/yape');
        } else {
            router.push('/compra/payment/bank');
        }
    };

    return (
        <Layout currentStep={1}>
            <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 shrink-0">
                <span className="material-symbols-outlined text-primary text-xl md:text-2xl">receipt_long</span>
                <h2 className="text-lg md:text-xl font-bold">Resumen de tu pedido</h2>
            </div>
            
            <div className="p-4 md:p-8 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                    {/* Plan Card */}
                    <div className="bg-black/40 rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-xl md:text-2xl font-bold mb-1">{plan.name}</h4>
                            <div className="flex flex-col mb-4">
                                {appliedCoupon ? (
                                    <>
                                        <div className="text-gray-500 text-lg line-through">S/ {plan.price.toFixed(2)}</div>
                                        <div className="text-primary text-3xl md:text-4xl font-black">S/ {finalPrice.toFixed(2)}</div>
                                    </>
                                ) : (
                                    <div className="text-primary text-3xl md:text-4xl font-black">S/ {plan.price.toFixed(2)}</div>
                                )}
                            </div>
                            <span className="text-gray-400 font-medium text-sm block mb-4">{getMonthlyPrice(plan)}</span>
                            <div className="w-full border-t border-white/10 mb-4"></div>
                            <ul className="space-y-3">
                                {plan.features?.map((f: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Payment & Coupon */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Método de Pago</h3>
                            <div className="space-y-3">
                                <label className="cursor-pointer block group">
                                    <input type="radio" className="hidden" checked={paymentMethod === 'yape'} onChange={() => setPaymentMethod('yape')} />
                                    <div className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${paymentMethod === 'yape' ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/5'}`}>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'yape' ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}>
                                            <span className="material-symbols-outlined">qr_code</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-white">Yape / Plin</div>
                                            <div className="text-xs text-gray-500">Confirmación vía captura</div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'yape' ? 'border-primary' : 'border-white/20'}`}>
                                            {paymentMethod === 'yape' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                    </div>
                                </label>

                                <label className="cursor-pointer block group">
                                    <input type="radio" className="hidden" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
                                    <div className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/5'}`}>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'bank' ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}>
                                            <span className="material-symbols-outlined">account_balance</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-white">Transferencia</div>
                                            <div className="text-xs text-gray-500">BCP, BBVA, Interbank</div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bank' ? 'border-primary' : 'border-white/20'}`}>
                                            {paymentMethod === 'bank' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Cupón de Descuento</h3>
                            {!appliedCoupon ? (
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Código" 
                                        className="w-full bg-white/5 border border-white/10 h-12 px-4 rounded-xl text-sm focus:outline-none focus:border-primary/50"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                    />
                                    <button 
                                        onClick={handleApplyCoupon}
                                        className="absolute right-2 top-2 px-4 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-bold hover:bg-primary/30 transition-all"
                                    >
                                        Validar
                                    </button>
                                    {couponError && <p className="text-red-400 text-xs mt-1">{couponError}</p>}
                                </div>
                            ) : (
                                <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">confirmation_number</span>
                                        <span className="text-sm font-bold text-white uppercase">{appliedCoupon.code}</span>
                                    </div>
                                    <button onClick={() => setAppliedCoupon(null)} className="text-gray-500 hover:text-red-400"><span className="material-symbols-outlined text-sm">close</span></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6 border-t border-white/5 bg-black/40 flex flex-row justify-between gap-3 md:justify-end">
                <button 
                    onClick={() => router.push('/')}
                    className="flex-1 md:flex-none px-8 py-3.5 rounded-xl border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/5 transition-colors"
                >
                    Cancelar
                </button>
                <button 
                    onClick={handleNext}
                    className="flex-1 md:flex-none px-10 py-3.5 rounded-xl bg-primary text-black font-black text-sm shadow-[0_4px_20px_rgba(0,255,127,0.3)] hover:scale-[1.02] transition-all active:scale-95"
                >
                    {finalPrice <= 0 ? 'Finalizar' : 'Siguiente'}
                </button>
            </div>

            {/* Success Modal Simulation */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
                    <div className="bg-[#161B22] border border-white/10 rounded-[32px] p-8 max-w-sm w-full text-center">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,127,0.4)]">
                            <span className="material-symbols-outlined text-black text-4xl font-bold">check</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">¡Compra exitosa!</h3>
                        <p className="text-gray-400 text-sm mb-6">Estamos procesando tu solicitud.</p>
                        <div className="bg-primary/10 text-primary py-3 px-6 rounded-2xl text-xs font-bold">Redirigiendo a tu cuenta...</div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default SummaryScreen;
