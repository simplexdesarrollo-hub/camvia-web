'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { fetchHomeData, HomeResponse, Reward } from '../../services/api';

// Dynamic imports for components that might use 'window' or global scripts
const Header = dynamic(() => import('../../components/Header'), { ssr: false });
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

export default function EventosPage() {
  const [ticketQty, setTicketQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({ d: 0, h: 0, m: 0, s: 0 });
  const [loading, setLoading] = useState(true);

  const TICKET_PRICE = homeData ? parseFloat(homeData.ticket.priceEntered) : 5;

  useEffect(() => {
    async function loadData() {
      const data = await fetchHomeData();
      if (data) {
        setHomeData(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    setTotalPrice(ticketQty * TICKET_PRICE);
  }, [ticketQty, TICKET_PRICE]);

  useEffect(() => {
    if (!homeData?.ticket.dateStart) return;

    const targetDate = new Date(homeData.ticket.dateStart).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [homeData]);

  const handleAdd = (num: number) => {
    setTicketQty(prev => Math.min(prev + num, 100));
  };

  const handleMinus = () => {
    setTicketQty(prev => Math.max(prev - 1, 0));
  };

  const handlePlus = () => {
    setTicketQty(prev => Math.min(prev + 1, 100));
  };

  const handlePurchase = () => {
    if (ticketQty <= 0) return;

    // Simple visual feedback
    alert(`Has seleccionado ${ticketQty} tickets para "${homeData?.ticket.name}". Serás redirigido a la pasarela de pago.`);
    setTicketQty(0);
  };

  if (loading) {
    return (
      <div className="loading-screen" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0f12', color: '#ffbf00' }}>
        <p className="font-title" style={{ fontSize: '2rem' }}>CAMVIA...</p>
      </div>
    );
  }

  const ticket = homeData?.ticket;
  const rewards = ticket?.rewards || [];

  return (
    <>
      <Header />

      <main className="event-page-container">
        {/* HERO SECTION */}
        <section className="event-hero">
          <div className="container">
            <div className="event-badge-live" style={{ position: 'relative', top: 'auto', right: 'auto', display: 'inline-flex', marginBottom: '10px' }}>
              <span className="dot"></span> EN VIVO: {ticket?.name || 'SORTEO ESPECIAL'}
            </div>
            <h1 className="hero-title font-title" style={{ fontSize: 'clamp(32px, 8vw, 78px)', textTransform: 'uppercase', lineHeight: 0.9 }}>
              CONSIGUE TU <br />
              TICKET <br />
              <span className="text-accent-yellow" style={{ fontSize: '1.1em', display: 'block', marginTop: '5px' }}>
                {ticket?.name || 'FIN DE MARZO'}
              </span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1rem', marginTop: '20px' }}>
              Celebra con {ticket?.name || 'FIN DE MARZO'} la oportunidad de ganar premios exclusivos. <br />
              Tu suerte brilla más que nunca.
            </p>
            <div className="hero-scroll" style={{ marginTop: '30px' }}>
              <Link href="#participar" className="btn btn-accent btn-large" style={{ background: 'linear-gradient(90deg, #ffbf00 0%, #d97706 100%)', color: '#000', border: 'none' }}>
                COMPRA AHORA <i className="ph ph-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* COUNTDOWN SECTION */}
        <section className="event-countdown-bar">
          <div className="container countdown-flex">
            <div className="countdown-info">
              <div className="info-icon"><i className="ph ph-dice-five"></i></div>
              <div className="info-text">
                <h3>OTORGAMOS EL PREMIO EN:</h3>
                <p>Cronómetro para el próximo sorteo dominical</p>
              </div>
            </div>

            <div className="countdown-timer">
              <div className="timer-unit">
                <span className="val">{timeLeft.d < 10 ? `0${timeLeft.d}` : timeLeft.d}</span>
                <span className="lab">DÍAS</span>
              </div>
              <span className="sep">:</span>
              <div className="timer-unit">
                <span className="val">{timeLeft.h < 10 ? `0${timeLeft.h}` : timeLeft.h}</span>
                <span className="lab">HRS</span>
              </div>
              <span className="sep">:</span>
              <div className="timer-unit">
                <span className="val">{timeLeft.m < 10 ? `0${timeLeft.m}` : timeLeft.m}</span>
                <span className="lab">MIN</span>
              </div>
              <span className="sep">:</span>
              <div className="timer-unit">
                <span className="val">{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}</span>
                <span className="lab">SEG</span>
              </div>
            </div>

            <div className="countdown-icon-right"><i className="ph ph-hourglass-high"></i></div>
          </div>
        </section>

        {/* PRIZES SECTION */}
        <section className="prizes-section container">
          <div className="section-header text-center">
            <h2 className="section-title font-title">PREMIOS <span className="text-accent-yellow">PARA ESTE EVENTO</span></h2>
            <p className="section-desc">Estos son los premios que puedes ganar participando.</p>
          </div>

          <div className="prizes-wrapper">
            {(rewards.length > 0 ? rewards.slice(0, 3) : [null, null, null]).map((reward, i) => {
              const isCenter = i === 1;
              const theme = i === 0 ? 'theme-silver' : i === 1 ? 'theme-gold' : 'theme-bronze';
              const label = i === 0 ? 'PLATA' : i === 1 ? 'ORO' : 'BRONCE';
              
              if (!reward) {
                return (
                  <div key={i} className={`prize-card-exclusive ${theme} ${isCenter ? 'active' : ''}`}>
                    <span className="card-tag">{label}</span>
                    <div className="prize-visual">
                      <div className="inner-circle"><i className="ph ph-mask-sad"></i></div>
                    </div>
                    <div className="prize-content">
                      <h3 className="prize-amount">---</h3>
                      <p className="prize-type">Próximamente</p>
                    </div>
                  </div>
                );
              }

              const displayValue = reward.url === null ? reward.payments : reward.name;

              return (
                <div key={reward.id} className={`prize-card-exclusive ${theme} ${isCenter ? 'active' : ''}`}>
                  {isCenter && <div className="crown-badge"><i className="ph ph-crown-simple"></i></div>}
                  {isCenter ? <span className="card-tag-badge">GANADOR</span> : <span className="card-tag">{label}</span>}
                  
                  <div className="prize-visual">
                    <div className={`inner-circle ${isCenter ? 'gold-glow' : ''}`}>
                      {reward.url && reward.url.trim() !== "" ? (
                        <img src={reward.url} alt={reward.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                      ) : (
                        <i className={`ph ${reward.icon?.startsWith('ph-') ? reward.icon : `ph-${reward.icon || 'gift'}`}`} style={{ color: isCenter ? '#ffbf00' : 'white', opacity: 0.8 }}></i>
                      )}
                    </div>
                  </div>
                  
                  <div className="prize-content">
                    <h3 className={`prize-amount ${isCenter ? 'text-accent-yellow' : ''}`}>
                      {displayValue || reward.name}
                    </h3>
                    {isCenter ? (
                      <div className="pill-badge">PREMIO MAYOR</div>
                    ) : (
                      <p className="prize-type">{reward.name}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PARTICIPATE SECTION */}
        <section id="participar" className="participate-section container">
          <div className="interaction-grid">
            {/* PURCHASE PANEL */}
            <div className="purchase-panel purchase-card-exclusive">
              <div className="card-header">
                <h2 className="font-title">Comprar <span className="text-accent-yellow">{ticket?.name || 'FIN DE MARZO'}</span></h2>
                <p>Selecciona cuantos tickets deseas y únete al <br /> sorteo de {ticket?.name || 'FIN DE MARZO'}.</p>
              </div>

              <div className="unit-price-box">
                <span className="price-label">PRECIO UNITARIO</span>
                <span className="price-value">{ticket?.currency || 'S/'} {ticket?.priceEntered || '5.00'}</span>
              </div>

              <div className="selection-area">
                <div className="quick-add-group">
                  <button onClick={() => handleAdd(1)}>+1</button>
                  <button onClick={() => handleAdd(5)}>+5</button>
                  <button onClick={() => handleAdd(10)}>+10</button>
                </div>

                <div className="main-qty-selector">
                  <button onClick={handleMinus} className="ctrl-btn"><i className="ph ph-minus"></i></button>
                  <span className="display-qty">{ticketQty}</span>
                  <button onClick={handlePlus} className="ctrl-btn"><i className="ph ph-plus"></i></button>
                </div>
              </div>

              <div className="checkout-summary">
                <div className="summary-row">
                  <div className="label-col">
                    <span>TOTAL</span>
                    <span>A PAGAR</span>
                  </div>
                  <div className="value-col">
                    {ticket?.currency || 'S/'} {totalPrice.toFixed(2)}
                  </div>
                </div>

                <button
                  className={`btn-checkout ${ticketQty === 0 ? 'disabled' : ''}`}
                  onClick={handlePurchase}
                  disabled={ticketQty === 0}
                >
                  REALIZAR PAGO <i className="ph ph-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .event-page-container {
          color: white;
          min-height: 100vh;
        }

        /* MOBILE PERFORMANCE: DISABLE HEAVY EFFECTS */
        @media (max-width: 768px) {
          .neon-grid-wrap, .orb, .scanline, #particles {
            display: none !important;
          }
          
          .background-layer {
            background: #0b0f12 !important; /* Flat dark color for mobile battery and perf */
          }
          
          .event-hero {
            background: linear-gradient(180deg, rgba(255, 191, 0, 0.05) 0%, transparent 100%) !important;
            padding: 60px 0 80px !important;
          }
        }

        /* HERO SECTION */
        .event-hero {
          padding: 50px 0 50px;
          text-align: center;
          position: relative;
          background: radial-gradient(circle at 50% -20%, rgba(255, 191, 0, 0.1), transparent 60%);
        }

        .hero-title {
          font-size: clamp(40px, 8vw, 84px);
          line-height: 1;
          margin-bottom: 24px;
          font-weight: 900;
          text-shadow: 0 0 30px rgba(255, 191, 0, 0.2);
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--muted);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        /* PRIZES */
        .prizes-section {
          padding: 60px 0;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 950;
          margin-bottom: 8px;
        }

        .section-desc {
          color: #94a3b8;
          margin-bottom: 50px;
        }

        .prizes-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .prize-card-exclusive {
          background: #0b0f12;
          width: 300px;
          height: 380px;
          border-radius: 30px;
          position: relative;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          transition: transform 0.3s;
        }

        .theme-silver { border-top: 3px solid #4a5568; }
        .theme-gold { border-top: 3px solid #ffbf00; }
        .theme-bronze { border-top: 3px solid #8c3f2b; }

        .prize-card-exclusive.active {
          transform: scale(1.05);
          z-index: 10;
          width: 340px;
          height: 420px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(255, 191, 0, 0.1);
        }

        .card-tag {
          position: absolute;
          top: 30px;
          right: 30px;
          font-size: 10px;
          font-weight: 900;
          color: #64748b;
          letter-spacing: 2px;
        }

        .card-tag-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #ffbf00;
          color: #000;
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 950;
        }

        .crown-badge {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
          background: #ffbf00;
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 0 20px rgba(255, 191, 0, 0.4);
        }

        .prize-visual {
          margin-top: 20px;
        }

        .inner-circle {
          width: 120px;
          height: 120px;
          background: rgba(255,255,255,0.03);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .gold-glow {
          box-shadow: 0 0 40px rgba(255, 191, 0, 0.1);
          border-color: rgba(255, 191, 0, 0.2);
        }

        .prize-amount {
          font-size: 2rem;
          font-weight: 950;
          margin-bottom: 5px;
        }

        .active .prize-amount {
          font-size: 2.8rem;
        }

        .prize-type {
          font-size: 10px;
          font-weight: 900;
          color: #64748b;
          letter-spacing: 1px;
        }

        .pill-badge {
          display: inline-block;
          border: 1px solid #ffbf00;
          color: #ffbf00;
          padding: 4px 20px;
          border-radius: 99px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .prizes-wrapper { gap: 40px; }
          .prize-card-exclusive.active { transform: none; width: 300px; height: 380px; }
        }

        /* PARTICIPATE GRID */
        .interaction-grid {
          display: flex;
          justify-content: center;
          padding: 40px 0 120px;
        }

        .purchase-card-exclusive {
          background: #0b0f12;
          border: 1px solid rgba(255, 191, 0, 0.3);
          border-radius: 40px;
          padding: 30px 30px;
          width: 100%;
          max-width: 540px;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(255, 191, 0, 0.05);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .card-header h2 {
          font-size: 2.2rem;
          margin-bottom: 12px;
          font-weight: 900;
        }

        .card-header p {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 30px;
        }

        .unit-price-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 191, 0, 0.1);
          padding: 10px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .price-label {
          font-size: 11px;
          font-weight: 900;
          color: #ffbf00;
          letter-spacing: 2px;
        }

        .price-value {
          font-size: 2.8rem;
          font-weight: 950;
          color: #ffbf00;
          text-shadow: 0 0 20px rgba(255, 191, 0, 0.3);
        }

        .selection-area {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 10px;
        }

        .quick-add-group {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .quick-add-group button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          width: 54px;
          height: 38px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-add-group button:hover {
          border-color: #ffbf00;
          background: rgba(255, 191, 0, 0.05);
        }

        .main-qty-selector {
          background: #000;
          padding: 10px 15px;
          border-radius: 99px;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          width: 300px;
          margin: 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ctrl-btn {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.1s;
        }

        .ctrl-btn:active {
          transform: scale(0.9);
        }

        .display-qty {
          font-size: 3.5rem;
          font-weight: 900;
          min-width: 80px;
        }

        .checkout-summary {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 10px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .label-col {
          display: flex;
          flex-direction: column;
          text-align: left;
          font-size: 12px;
          font-weight: 900;
          color: #94a3b8;
          line-height: 1.2;
          letter-spacing: 1px;
        }

        .value-col {
          font-size: 2rem;
          font-weight: 950;
        }

        .btn-checkout {
          width: 100%;
          background: linear-gradient(90deg, #ffbf00 0%, #d18d00 100%);
          color: #000;
          border: none;
          padding: 22px;
          border-radius: 20px;
          font-size: 18px;
          font-weight: 950;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s;
          box-shadow: 0 15px 30px rgba(255, 191, 0, 0.2);
        }

        .btn-checkout:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(255, 191, 0, 0.3);
        }

        .btn-checkout.disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        @media (max-width: 900px) {
          .interaction-grid {
            padding: 40px 20px;
          }

          .purchase-card-exclusive {
            padding: 30px 20px;
          }

          .main-qty-selector {
            width: 100%;
          }
        }

        .glass-panel {
          background: rgba(11, 15, 18, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 40px;
          padding: 40px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }

        .panel-header h2 {
          font-size: 2.2rem;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .panel-header p {
          color: var(--muted);
          font-size: 0.95rem;
          padding-bottom: 30px;
        }

        .price-badge-large {
          padding: 30px;
          border-radius: 24px;
          text-align: center;
          margin-bottom: 30px;
        }

        .price-badge-large .label {
          display: block;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .price-badge-large .value {
          font-size: 3.5rem;
          font-weight: 950;
        }

        .purchase-controls {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-bottom: 40px;
        }

        .quick-add {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .quick-add button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 8px 18px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-add button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ffbf00;
        }

        .qty-selector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          background: rgba(0, 0, 0, 0.3);
          padding: 15px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .counter-btn {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: white;
          border-radius: 12px;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .counter-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffbf00;
        }

        .qty-value {
          font-size: 3.5rem;
          font-weight: 900;
          min-width: 80px;
          text-align: center;
        }

        .total-panel {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 40px;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .total-label {
          font-size: 11px;
          font-weight: 900;
          color: var(--muted);
          letter-spacing: 2px;
          line-height: 1.3;
        }

        .total-value {
          font-size: 3rem;
          font-weight: 900;
        }

        .buy-btn {
          width: 100%;
          font-size: 1.2rem;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .buy-btn.disabled {
          opacity: 0.3;
          pointer-events: none;
          filter: grayscale(1);
        }

        .buy-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 191, 0, 0.3);
        }

        /* WALLET PANEL */
        .wallet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .wallet-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
        }

        .wallet-panel h3 {
          font-size: 1.8rem;
          font-weight: 950;
          margin: 0;
        }

        .subtitle {
          font-size: 10px;
          font-weight: 900;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 5px !important;
        }

        .header-right {
          text-align: right;
        }

        .ticket-count {
          font-size: 3rem;
          font-weight: 950;
          line-height: 1;
        }

        .tickets-list {
          height: 500px;
          overflow-y: auto;
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding-right: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 99px;
        }

        .empty-wallet {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0.3;
        }

        .empty-wallet i {
          font-size: 5rem;
          margin-bottom: 20px;
        }

        .empty-wallet p {
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 1.2rem;
          margin: 0;
        }

        /* GOLDEN TICKET UI */
        .golden-ticket-ui {
          display: flex;
          height: 110px;
          border-radius: 20px;
          overflow: hidden;
          background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, #000 80%),
                      radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #58481d 100%);
          border: 1px solid #B8860B;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          flex-shrink: 0;
        }

        .ticket-main {
          flex-grow: 1;
          padding: 15px 25px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #3b2800;
          border-right: 2px dashed rgba(59, 40, 0, 0.2);
        }

        .ticket-head {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .ticket-code {
          font-family: monospace;
          font-size: 1.8rem;
          font-weight: 950;
          letter-spacing: 5px;
        }

        .ticket-foot {
          font-size: 9px;
          font-weight: 800;
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ticket-stub-ui {
          width: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.03);
          color: #3b2800;
        }

        .ticket-stub-ui i {
          font-size: 2rem;
          margin-bottom: 5px;
          opacity: 0.5;
        }

        .stub-id {
          font-size: 9px;
          font-weight: 900;
          opacity: 0.4;
        }

        .panel-footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .secure-badge {
          font-size: 9px;
          font-weight: 800;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .clear-btn {
          background: none;
          border: none;
          color: rgba(255, 95, 95, 0.3);
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .clear-btn:hover {
          color: #ff5f5f;
        }

        /* COUNTDOWN BAR STYLES */
        .event-countdown-bar {
          background: #000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px 0;
        }

        .countdown-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .countdown-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .info-icon {
          font-size: 24px;
          color: #ffbf00; /* Matching gold */
          animation: floatDice 3s ease-in-out infinite;
        }

        @keyframes floatDice {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(15deg); }
        }

        .info-text h3 {
          font-size: 14px;
          font-weight: 950;
          color: white;
          margin: 0;
          letter-spacing: 1px;
        }

        .info-text p {
          font-size: 10px;
          color: #64748b;
          margin: 0;
        }

        .countdown-timer {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .timer-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 50px;
        }

        .timer-unit .val {
          font-size: 32px;
          font-weight: 950;
          color: white;
          line-height: 1;
        }

        .timer-unit .lab {
          font-size: 10px;
          font-weight: 900;
          color: #ffbf00;
          margin-top: 5px;
        }

        .sep {
          font-size: 20px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.2);
          margin-bottom: 15px;
        }

        .countdown-icon-right {
          color: #ffbf00;
          font-size: 32px;
          display: inline-block; /* Essential for transform animations on inline elements */
          animation: smoothSpin 5s ease-in-out infinite;
        }

        @keyframes smoothSpin {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(180deg); }
          50% { transform: rotate(180deg); }
          70% { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .countdown-flex {
            flex-direction: column;
            gap: 30px;
          }
          
          .countdown-timer {
            transform: scale(0.85);
          }
        }
      `}</style>
    </>
  );
}
