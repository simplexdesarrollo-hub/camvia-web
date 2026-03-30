'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import dynamic from 'next/dynamic';
import { fetchHomeData, fetchRewards, HomeResponse, Reward } from '@/services/api';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });

const EventosPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [homeData, setHomeData] = useState<HomeResponse | null>(null);
    const [ticketPrice, setTicketPrice] = useState(5);
    const [ticketName, setTicketName] = useState('Tickets');
    const [ticketDescription, setTicketDescription] = useState('CONSIGUE TU');
    const [ticketId, setTicketId] = useState<number | null>(null);
    const [rewards, setRewards] = useState<Reward[]>([]);

    const [qty, setQty] = useState(0);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const [isLive, setIsLive] = useState(false);

    // Auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
            if (!u && !loading) {
                router.push('/login?from=/eventos');
            }
        });
        return () => unsubscribe();
    }, [router, loading]);

    // Scroll to top
    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, []);

    // Load Data
    useEffect(() => {
        const loadHomeData = async () => {
            const data = await fetchHomeData();
            if (data && data.ticket) {
                setHomeData(data);
                setTicketName(data.ticket.name);
                setTicketDescription(data.ticket.description);
                setTicketPrice(parseFloat(data.ticket.priceEntered));
                setTicketId(data.ticket.id);

                const rewardsData = await fetchRewards(data.ticket.id);
                if (rewardsData && Array.isArray(rewardsData)) {
                    setRewards(rewardsData);
                }
            }
        };
        loadHomeData();
    }, []);

    // Countdown Logic
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            let target = new Date();

            const day = now.getDay();
            const diffDays = (7 - day) % 7;

            target.setDate(now.getDate() + diffDays);
            target.setHours(22, 0, 0, 0);

            if (now >= target) {
                if (now.getHours() === 22) {
                    setIsLive(true);
                    setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
                    return;
                }
                target.setDate(target.getDate() + 7);
            }

            setIsLive(false);
            const diffMs = target.getTime() - now.getTime();

            if (diffMs > 0) {
                setCountdown({
                    days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    mins: Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)),
                    secs: Math.floor((diffMs % (1000 * 60)) / 1000)
                });
            }
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();
        return () => clearInterval(interval);
    }, []);

    const total = qty * ticketPrice;

    const handleBuy = () => {
        if (qty <= 0) return;
        router.push(`/compra?id=${ticketId}&qty=${qty}`);
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden pt-20">
            {/* Mantener estilos cargando fuentes y CSS específico */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Montserrat:wght@400;700;800;900&family=Cinzel:wght@700;900&display=swap" rel="stylesheet" />
            
            <style jsx global>{`
                :root {
                    --font-inter: 'Inter', sans-serif;
                    --font-montserrat: 'Montserrat', sans-serif;
                    --font-cinzel: 'Cinzel', serif;
                }

                .font-inter { font-family: var(--font-inter); }
                .font-montserrat { font-family: var(--font-montserrat); }
                .font-cinzel { font-family: var(--font-cinzel); }

                @keyframes hourglass-rotate {
                    0% { transform: rotate(0deg); }
                    5% { transform: rotate(180deg); }
                    50% { transform: rotate(180deg); }
                    55% { transform: rotate(180deg) rotateY(180deg); }
                    100% { transform: rotate(180deg) rotateY(180deg); }
                }

                .animate-hourglass-custom {
                    animation: hourglass-rotate 6s infinite cubic-bezier(0.77, 0, 0.175, 1);
                    display: inline-block;
                }

                @keyframes num-tick {
                    0% { transform: translateY(-15px); opacity: 0; filter: blur(4px); }
                    100% { transform: translateY(0); opacity: 1; filter: blur(0); }
                }

                .animate-num {
                    display: inline-block;
                    animation: num-tick 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                /* Mantener estilos de botón específicos */
                .btn.accent {
                    background: var(--accent) !important;
                    color: var(--bg) !important;
                    box-shadow: 0 0 22px rgba(0, 255, 127, .55) !important;
                    border-color: transparent !important;
                }

                .btn.accent:hover {
                    background: var(--accent-700) !important;
                    box-shadow: 0 0 30px rgba(0, 255, 127, .75) !important;
                }
            `}</style>

            <Header />

            {/* Hero Banner */}
            <section className="relative pt-16 pb-20 overflow-hidden flex items-center">
                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-20 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
                </div>

                <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 text-center max-w-5xl mx-auto px-4 w-full">
                    <span className="inline-block py-1 px-4 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold tracking-widest uppercase mb-6 animate-pulse font-inter">
                        ● En Vivo: Sorteo de {ticketName}
                    </span>

                    <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight drop-shadow-xl font-montserrat uppercase">
                        {ticketDescription} <br />
                        <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(255,215,0,0.3)]">
                            {ticketName}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-inter font-light leading-relaxed">
                        Celebra con {ticketName} la oportunidad de ganar premios exclusivos. Tu suerte brilla más que nunca.
                    </p>

                    <div className="flex justify-center gap-4">
                        <a
                            href="#participar"
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-10 py-4 rounded-full font-bold shadow-lg shadow-yellow-500/20 flex items-center gap-2 text-black text-lg hover:scale-105 transition-transform uppercase tracking-wider font-montserrat"
                        >
                            Comprar Ahora <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </section>

            {/* Cronómetro */}
            <section className="border-y border-white/5 bg-black/40 backdrop-blur-sm relative z-20">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider font-montserrat flex items-center gap-2">
                                {isLive ? '🔴 EN VIVO' : '🎲 Otorgamos el premio en:'}
                            </h3>
                            <p className="text-xs text-gray-500 font-inter">
                                {isLive ? 'El sorteo ha comenzado, ¡conéctate ahora!' : 'Cronómetro para el próximo sorteo dominical'}
                            </p>
                        </div>

                        {isLive ? (
                            <div className="flex items-center">
                                <button
                                    className="btn accent flex items-center gap-2 px-8 py-4 text-lg font-montserrat"
                                    onClick={() => window.open('/vivo', '_blank')}
                                >
                                    Ver en vivo →
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 md:gap-8 font-montserrat">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-black text-white animate-num">
                                        {String(countdown.days).padStart(2, '0')}
                                    </div>
                                    <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">Días</div>
                                </div>
                                <div className="text-2xl font-thin text-gray-600">:</div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-black text-white animate-num">
                                        {String(countdown.hours).padStart(2, '0')}
                                    </div>
                                    <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">Hrs</div>
                                </div>
                                <div className="text-2xl font-thin text-gray-600">:</div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-black text-white animate-num">
                                        {String(countdown.mins).padStart(2, '0')}
                                    </div>
                                    <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">Min</div>
                                </div>
                                <div className="text-2xl font-thin text-gray-600">:</div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-black text-white animate-num">
                                        {String(countdown.secs).padStart(2, '0')}
                                    </div>
                                    <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">Seg</div>
                                </div>
                            </div>
                        )}

                        {!isLive && (
                            <div className="hidden md:block">
                                <i className="fas fa-hourglass-half text-3xl text-yellow-500/40 animate-pulse"></i>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Premios */}
            {rewards.length > 0 && (
                <section id="premios" className="py-20 relative bg-black/20">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-black mb-2 font-montserrat uppercase">
                                PREMIOS <span className="text-yellow-400">PARA ESTE EVENTO</span>
                            </h2>
                            <p className="text-gray-400 text-sm font-inter">Estos son los premios que puedes ganar participando.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {(() => {
                                const sortedRewards = [...rewards].slice(0, 3).sort((a, b) => {
                                    const order = [2, 1, 3]; // Plata, Oro, Bronce
                                    return order.indexOf(a.top) - order.indexOf(b.top);
                                });

                                return sortedRewards.map((reward, index) => {
                                    const isFirst = reward.top === 1;
                                    const isThird = reward.top === 3;

                                    let borderClass = "border-gray-500";
                                    let glowClass = "shadow-[0_0_20px_rgba(100,100,100,0.1)]";
                                    let medalName = "PLATA";
                                    let containerClass = "md:translate-y-4";
                                    let bgGradient = "from-blue-900/10 to-black/60";

                                    if (isFirst) {
                                        borderClass = "border-yellow-500";
                                        glowClass = "shadow-[0_10px_40px_rgba(255,215,0,0.2)]";
                                        medalName = "ORO";
                                        containerClass = "md:-translate-y-4 z-10 scale-105";
                                        bgGradient = "from-yellow-900/20 to-black/80";
                                    } else if (isThird) {
                                        borderClass = "border-orange-700";
                                        glowClass = "shadow-[0_0_20px_rgba(194,65,12,0.1)]";
                                        medalName = "BRONCE";
                                        containerClass = "md:translate-y-4";
                                        bgGradient = "from-orange-900/10 to-black/60";
                                    }

                                    return (
                                        <div
                                            key={reward.id || index}
                                            className={`bg-gradient-to-b ${bgGradient} backdrop-blur-md p-8 rounded-3xl flex flex-col items-center justify-center gap-6 aspect-square group relative border-t-4 ${borderClass} transition-all hover:scale-110 duration-500 ${containerClass} ${glowClass}`}
                                        >
                                            {isFirst && (
                                                <>
                                                    <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest z-10 font-montserrat">
                                                        GANADOR
                                                    </div>
                                                    <div className="absolute -top-6 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-black shadow-lg z-20">
                                                        <i className="fas fa-crown text-black text-xl"></i>
                                                    </div>
                                                </>
                                            )}

                                            {!isFirst && (
                                                <div className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 font-montserrat">
                                                    {medalName}
                                                </div>
                                            )}

                                            <div className={`w-32 h-32 ${isFirst ? 'bg-yellow-500/10 shadow-[0_0_30px_rgba(255,215,0,0.1)]' : 'bg-white/5'} rounded-full flex items-center justify-center group-hover:scale-110 transition duration-700 relative`}>
                                                <span className="material-symbols-outlined text-6xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                                    {reward.icon}
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full"></div>
                                            </div>

                                            <div className="text-center w-full">
                                                <h3 className={`text-4xl font-black mb-2 font-montserrat uppercase ${isFirst ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent' : 'text-white'}`}>
                                                    {reward.name}
                                                </h3>
                                                {isFirst ? (
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-500 border border-yellow-500/30 px-4 py-1.5 rounded-full inline-block font-montserrat">
                                                        PREMIO MAYOR
                                                    </p>
                                                ) : (
                                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest font-montserrat">
                                                        {reward.top === 2 ? 'Alta Gama' : 'Vale de Recompensa'}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </section>
            )}

            {/* Zona de Compra */}
            <section id="participar" className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="w-full max-w-lg mx-auto space-y-6">
                        <div className="bg-gradient-to-b from-gray-900/60 to-black/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border-t-4 border-t-yellow-500 relative overflow-hidden text-center">
                            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none"></div>

                            <h2 className="text-3xl font-black mb-2 font-montserrat text-white">Comprar {ticketName}</h2>
                            <p className="text-sm text-gray-400 mb-8 max-w-xs mx-auto font-inter">
                                Selecciona cuantos tickets deseas y únete al sorteo de {ticketName}.
                            </p>

                            <div className="inline-flex flex-col items-center mb-8 bg-black/40 p-4 rounded-2xl border border-yellow-500/20 shadow-inner min-w-[200px]">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 font-inter">Precio Unitario</span>
                                <span className="text-3xl font-bold text-yellow-400 font-montserrat drop-shadow-md">S/ {ticketPrice.toFixed(2)}</span>
                            </div>

                            <div className="mb-8 max-w-sm mx-auto">
                                <div className="flex justify-center gap-2 mb-4">
                                    {[1, 5, 10].map(n => (
                                        <button
                                            key={n}
                                            onClick={() => setQty(prev => Math.min(prev + n, 100))}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-full border border-white/10 transition font-inter"
                                        >
                                            +{n}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center justify-center gap-4 bg-black/50 rounded-full p-2 border border-white/10 shadow-lg">
                                    <button
                                        onClick={() => setQty(prev => Math.max(prev - 1, 0))}
                                        className="w-14 h-14 bg-gray-800 hover:bg-red-500/20 text-white text-xl rounded-full transition flex items-center justify-center shadow-lg active:scale-90"
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <input
                                        type="number"
                                        value={qty}
                                        readOnly
                                        className="w-24 bg-transparent text-center text-5xl font-bold text-white outline-none font-montserrat"
                                    />
                                    <button
                                        onClick={() => setQty(prev => Math.min(prev + 1, 100))}
                                        className="w-14 h-14 bg-gray-800 hover:bg-green-500/20 text-white text-xl rounded-full transition flex items-center justify-center shadow-lg active:scale-90"
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-6">
                                <div className="flex justify-between items-end mb-6 px-4 text-left font-montserrat">
                                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wide">
                                        Total<br />a Pagar
                                    </span>
                                    <span className="text-4xl font-black text-white leading-none">S/ {total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleBuy}
                                    disabled={qty === 0}
                                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 py-5 rounded-2xl shadow-[0_10px_20px_rgba(255,215,0,0.2)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale transition transform active:scale-95 text-black font-black text-lg uppercase tracking-widest hover:shadow-[0_15px_30px_rgba(255,215,0,0.4)] font-montserrat"
                                >
                                    <span>Realizar Pago</span>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventosPage;
