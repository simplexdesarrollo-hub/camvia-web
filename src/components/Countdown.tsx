'use client';
import { useEffect, useState } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    // Arbitrary target date matching layout text
    const target = new Date("2026-03-29T22:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-bar">
      <div className="countdown-inner">
        <div className="htb-info">
          <div className="htb-icon">🎲</div>
          <div className="htb-texts">
            <h3 className="htb-title">Otorgamos premios en:</h3>
            <p className="htb-date">DOMINGO, 29 DE MARZO - 10:00 PM</p>
          </div>
        </div>
        <div className="htb-timers">
          <div className="htb-box">
            <span className="htb-num" id="dDias">{timeLeft.d.toString().padStart(2, '0')}</span>
            <span className="htb-lbl">Días</span>
          </div>
          <div className="htb-box">
            <span className="htb-num" id="dHoras">{timeLeft.h.toString().padStart(2, '0')}</span>
            <span className="htb-lbl">Horas</span>
          </div>
          <div className="htb-box">
            <span className="htb-num" id="dMin">{timeLeft.m.toString().padStart(2, '0')}</span>
            <span className="htb-lbl">Min</span>
          </div>
          <div className="htb-box active">
            <span className="htb-num" id="dSeg">{timeLeft.s.toString().padStart(2, '0')}</span>
            <span className="htb-lbl">Seg</span>
          </div>
        </div>
        <div className="htb-action">
          <button className="htb-btn">Participar ahora &rarr;</button>
        </div>
      </div>
    </div>
  );
}
