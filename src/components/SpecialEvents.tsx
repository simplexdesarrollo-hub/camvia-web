'use client';

import Link from 'next/link';

export default function SpecialEvents() {
  return (
    <section className="container section" id="eventos">
      <div className="text-center mb-12">
        <h2 className="font-title text-5xl font-black mb-4 text-white uppercase tracking-tight">
          Eventos <span className="text-accent-yellow">Especiales</span>
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Participa en sorteos exclusivos y gana premios increíbles
        </p>
      </div>

      <div className="events-grid">
        {/* EVENTO ACTIVO */}
        <div className="event-card active">
          <div className="event-badge-live">
             <span className="dot"></span> EN VIVO
          </div>
          <div className="event-icon-box">
             <img src="/images/logos/logos_golden.png" alt="Golden Ticket" />
          </div>
          <div className="event-content">
            <h3 className="event-title">FIN DE MARZO</h3>
            <p className="event-desc">
              Consigue tu Golden Ticket y participa por premios exclusivos. ¡Tu suerte brilla más que nunca!
            </p>
            
            <div className="event-rewards">
              <div className="reward-tag">
                <i className="ph ph-money"></i> 100 soles
              </div>
              <div className="reward-tag">
                <i className="ph ph-money"></i> 50 soles
              </div>
              <div className="reward-tag">
                <i className="ph ph-money"></i> 30 soles
              </div>
            </div>

            <Link href="/eventos" className="btn-event-primary">
              VER EVENTO <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* PROXIMAMENTE */}
        <div className="event-card disabled">
          <div className="event-icon-placeholder">
             <i className="ph ph-hourglass-low"></i>
          </div>
          <div className="event-content text-center">
            <h3 className="event-title mt-4">Próximamente</h3>
            <p className="event-desc mx-auto">
              Nuevos eventos exclusivos están en camino. ¡Mantente atento!
            </p>
            <button className="btn-event-disabled mt-6">
              <i className="ph ph-clock"></i> MUY PRONTO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
