'use client';

import { useEffect, useRef } from 'react';

export default function PrizesCarousel() {
  const vpRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => vpRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRight = () => vpRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  return (
    <section className="container section" id="premios">
      <div className="text-center mb-12 mt-6 relative z-20 px-4">
        <h2 className="font-title text-4xl font-black mb-4 text-white tracking-tight drop-shadow-lg" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Próximos <span className="text-accent">Premios Confirmados</span>
        </h2>
      </div>
      <div className="carousel" id="upcoming">
        <div className="arrow prev" onClick={scrollLeft}>‹</div>
        <div className="viewport" ref={vpRef}>
          <div className="track">
            {/* Premios principales */}
            <article className="prize">
              <div className="thumb-lg">
                <img src="/images/premios/IPHONE 17 PRO MAX web.png" alt="IPHONE 17" />
              </div>
              <h3>IPHONE 17 PRO MAX</h3>
              <p className="date">Agosto 2026</p>
              <button className="btn-sm text-sm p-2 w-full mt-2 rounded-full border-accent-30 uppercase font-bold text-gray-400">Pronto</button>
            </article>

            <article className="prize">
              <div className="thumb-lg">
                <img src="/images/premios/PS5 CAMVIA WEB.png" alt="PS5" />
              </div>
              <h3>PLAYSTATION 5</h3>
              <p className="date">Agosto 2026</p>
              <button className="btn-sm text-sm p-2 w-full mt-2 rounded-full border-accent-30 uppercase font-bold text-gray-400">Pronto</button>
            </article>

            <article className="prize">
              <div className="thumb-lg">
                <img src="/images/premios/TV OLED SAMSUNG CAMVIA WEB.png" alt="TV OLED SAMSUNG" />
              </div>
              <h3>TV OLED SAMSUNG</h3>
              <p className="date">Agosto 2026</p>
              <button className="btn-sm text-sm p-2 w-full mt-2 rounded-full border-accent-30 uppercase font-bold text-gray-400">Pronto</button>
            </article>

            <article className="prize">
              <div className="thumb-lg">
                <img src="/images/premios/S26 ULTRA CAMVIA WEB.png" alt="SAMSUNG S26 ULTRA" />
              </div>
              <h3>SAMSUNG S26 ULTRA</h3>
              <p className="date">Agosto 2026</p>
              <button className="btn-sm text-sm p-2 w-full mt-2 rounded-full border-accent-30 uppercase font-bold text-gray-400">Pronto</button>
            </article>

            <article className="prize">
              <div className="thumb-lg">
                <img src="/images/premios/MOTO CAMVIA.png" alt="MOTO CAMVIA" />
              </div>
              <h3>MOTO CAMVIA</h3>
              <p className="date">Agosto 2026</p>
              <button className="btn-sm text-sm p-2 w-full mt-2 rounded-full border-accent-30 uppercase font-bold text-gray-400">Pronto</button>
            </article>

            <article className="prize">
              <div className="thumb-lg">
                <img src="/images/premios/LAVADORA SAMSUNG CAMVIA 2 WEB.png" alt="LAVADORA SAMSUNG" />
              </div>
              <h3>LAVADORA SAMSUNG</h3>
              <p className="date">Agosto 2026</p>
              <button className="btn-sm text-sm p-2 w-full mt-2 rounded-full border-accent-30 uppercase font-bold text-gray-400">Pronto</button>
            </article>

            <article className="prize">
              <div className="thumb-lg">
                <img src="/images/premios/REFRIGERADORA SAMSUNG CAMVIA WEB.png" alt="REFRIGERADORA SAMSUNG" />
              </div>
              <h3>REFRIGERADORA SAMSUNG</h3>
              <p className="date">Agosto 2026</p>
              <button className="btn-sm text-sm p-2 w-full mt-2 rounded-full border-accent-30 uppercase font-bold text-gray-400">Pronto</button>
            </article>

            <article className="prize">
              <div className="thumb-lg">
                <img src="/images/premios/TAB S10 SAMSUNG CAMVIA WEB.png" alt="TAB S10 SAMSUNG" />
              </div>
              <h3>TAB S10 SAMSUNG</h3>
              <p className="date">Agosto 2026</p>
              <button className="btn-sm text-sm p-2 w-full mt-2 rounded-full border-accent-30 uppercase font-bold text-gray-400">Pronto</button>
            </article>
          </div>
        </div>
        <div className="arrow next" onClick={scrollRight}>›</div>
      </div>
    </section>
  );
}
