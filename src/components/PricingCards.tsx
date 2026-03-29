'use client';

import { Package } from '../services/api';

export default function PricingCards({ packages }: { packages: Package[] }) {
  // Sort or format packages if necessary.

  // Helper functions to get tier colors based on Package name
  const getTierClass = (name: string) => {
    switch (name) {
      case "Activa Tu Suerte": return "tier-1";
      case "Mantén Tu Suerte": return "tier-2";
      case "Potencia Tu Suerte": return "tier-3";
      case "Vive Tu Suerte": return "tier-max";
      default: return "tier-1";
    }
  };

  const getTrophyHTML = (name: string) => {
    const tier = getTierClass(name);
    if (tier === 'tier-1') {
      return (
        <div className="trophy-container">
          <div className="trophy-t1-outer"></div>
          <div className="trophy-t1-inner"></div>
          <i className="ph-fill ph-shield badge-icon"></i>
        </div>
      );
    }
    if (tier === 'tier-2') {
      return (
        <div className="trophy-container">
          <div className="trophy-t2-outer"></div>
          <div className="trophy-t2-inner"></div>
          <i className="ph-fill ph-star badge-icon"></i>
        </div>
      );
    }
    if (tier === 'tier-3') {
      return (
        <div className="trophy-container">
          <div className="trophy-t3-outer"></div>
          <div className="trophy-t3-inner"></div>
          <i className="ph-fill ph-diamond badge-icon"></i>
        </div>
      );
    }
    // tier-max
    return (
      <div className="trophy-container">
        <div className="trophy-t4-ring-1"></div>
        <div className="trophy-t4-ring-2"></div>
        <div className="trophy-t4-core"></div>
        <div className="t4-float t4-f1"></div>
        <div className="t4-float t4-f2"></div>
        <div className="t4-float t4-f3"></div>
        <div className="t4-float t4-f4"></div>
        <i className="ph-fill ph-crown badge-icon"></i>
      </div>
    );
  };

  return (
    <section id="planes" className="content-wrapper">
      <div className="text-center mb-12 mt-6 z-20 relative px-4 flex flex-col items-center">
        <div className="inline-flex items-center justify-center gap-2 mb-3 px-5 py-1-5 rounded-full bg-accent-10 border border-accent-30">
          <i className="ph-fill ph-sparkle text-accent text-sm"></i>
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Nuevos Beneficios</span>
        </div>
        <h2 className="font-title text-5xl font-black mb-2 mt-0 text-white tracking-tight drop-shadow-lg text-center" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Planes de <span className="text-accent">Participación</span>
        </h2>
        <p className="text-gray-400 text-sm font-medium max-w-2xl mx-auto leading-relaxed text-center mt-1">
          Participando Más Tiempo Te Mantienes Más Cerca De Los Premios<br />
          Tu plan comenzará oficialmente con el primer sorteo
        </p>
      </div>

      <div className="w-full">
        <div className="pricing-container">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`pricing-card ${getTierClass(pkg.name)}`}>
              <div className="card-top">
                <h2 className="plan-title font-title text-slate-300">{pkg.name}</h2>
                <div className="badge-wrapper">
                  {getTrophyHTML(pkg.name)}
                </div>
                <div className="price-box">
                  <span className="currency">S/</span>
                  <span className="price">{parseFloat(pkg.priceEntered).toFixed(0)}</span>
                </div>
                <div className="period-label">Por {pkg.months} Meses</div>
              </div>
              <div className="card-bottom">
                <div className="feature-list">
                  {pkg.details.sort((a, b) => a.order - b.order).map((detail) => (
                    <div key={detail.id} className="feature-item">
                      <i className="ph-fill ph-check-circle feature-icon"></i>
                      <span>{detail.description}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-action">Adquirir Plan</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
