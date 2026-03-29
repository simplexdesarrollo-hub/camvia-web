'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';

export default function HeroSplit() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="inicio" className="hero-split container">
      <div className="hero-text">
        <div className="date-pill">📅 Agosto 2026: Lanzamiento Oficial</div>
        <h2>Más que un sorteo, un <span>universo de premios</span></h2>
        <p>Participa en DADOS, BINGO o Sorteo y gana muchos premios. Ser parte hoy es ganar. Regístrate y únete al juego.</p>
        
        {!user && (
          <Link href="/register" className="btn btn-ghost px-8 py-4 font-bold text-base mt-2">
            Registrarme ahora
          </Link>
        )}
      </div>

      <div className="games-stack" id="juegos">
        <a href="https://dados.camvia.pe" target="_blank" rel="noopener noreferrer" className="game-row dados">
          <span className="year-badge">2026</span>
          <div className="gr-left">
            <div className="gr-icon">
              <img src="/images/logos/logo_dados.png" alt="Dados" />
            </div>
            <div className="gr-text">
              <h3>DADOS</h3>
              <p>Compite en el ranking y gana premios según tu posición.</p>
            </div>
          </div>
          <i className="gr-arrow ph ph-arrow-right"></i>
        </a>

        <div className="game-row bingo locked">
          <span className="year-badge">2026</span>
          <div className="gr-left">
            <div className="gr-icon">
              <img src="/images/logos/logo_bingo.png" alt="Bingo" />
            </div>
            <div className="gr-text">
              <h3>BINGO</h3>
              <p>Adquiere tu cartilla, juega en vivo y gana grandes premios.</p>
            </div>
          </div>
          <i className="gr-arrow ph ph-lock"></i>
        </div>

        <div className="game-row sorteo locked">
          <span className="year-badge">2026</span>
          <div className="gr-left">
            <div className="gr-icon">
              <img src="/images/logos/logo_regalos.png" alt="Sorteo" />
            </div>
            <div className="gr-text">
              <h3>SORTEO</h3>
              <p>Participa y gana premios grandes como iPhones, laptops y más.</p>
            </div>
          </div>
          <i className="gr-arrow ph ph-lock"></i>
        </div>
      </div>
      
      <style jsx>{`
        .hero-split {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
          padding: 80px 0;
        }

        .hero-text h2 {
          font-size: clamp(36px, 4vw, 56px);
          line-height: 1.1;
          margin: 0 0 20px;
          font-weight: 950;
          color: #fff;
        }

        .hero-text h2 span {
          color: var(--accent);
        }

        .hero-text p {
          color: var(--muted);
          font-size: 18px;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .date-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid var(--gold);
          border-radius: 99px;
          color: var(--gold);
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 24px;
          background: rgba(0, 0, 0, 0.5);
        }

        .games-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .game-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
        }

        .game-row:hover:not(.locked) {
          transform: translateY(-4px) scale(1.02);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .game-row.locked { opacity: 0.4; cursor: not-allowed; }

        .game-row.dados { border-left: 6px solid #ff9068; }
        .game-row.bingo { border-left: 6px solid #4facfe; }
        .game-row.sorteo { border-left: 6px solid var(--accent); }

        .gr-left { display: flex; align-items: center; gap: 20px; }
        .gr-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.1)); }
        .gr-icon img { width: 100%; height: 100%; object-fit: contain; }
        .gr-text h3 { font-weight: 900; font-size: 18px; text-transform: uppercase; margin: 0; color: #fff; }
        .gr-text p { font-size: 14px; color: #888; margin: 4px 0 0; }
        .gr-arrow { color: #444; transition: var(--transition); font-size: 24px; }
        .game-row:hover .gr-arrow { color: #fff; transform: translateX(5px); }

        .year-badge { position: absolute; top: 10px; right: 10px; font-size: 10px; font-weight: 800; color: #fff; opacity: 0.3; }

        @media (max-width: 900px) {
          .hero-split { grid-template-columns: 1fr; text-align: center; gap: 40px; }
          .gr-left { text-align: left; }
        }
      `}</style>
    </section>
  );
}
