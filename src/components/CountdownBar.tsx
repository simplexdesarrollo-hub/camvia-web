'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CountdownBar() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target: Next Sunday at 10:00 PM
      const target = new Date();
      target.setDate(now.getDate() + (7 - now.getDay()) % 7);
      target.setHours(22, 0, 0, 0);

      if (now > target) {
        target.setDate(target.getDate() + 7);
      }

      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: d.toString().padStart(2, '0'),
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0')
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-bar-wrap">
      <div className="countdown-bar-container">
        <div className="htb-info">
          <div className="htb-icon">🎲</div>
          <div className="htb-texts">
            <h3 className="htb-title">Otorgamos premios en:</h3>
            <p className="htb-date">PRÓXIMO DOMINGO - 10:00 PM</p>
          </div>
        </div>
        
        <div className="htb-timers">
          <div className="htb-box">
            <span className="htb-num">{timeLeft.days}</span>
            <span className="htb-lbl">Días</span>
          </div>
          <div className="htb-box">
            <span className="htb-num">{timeLeft.hours}</span>
            <span className="htb-lbl">Horas</span>
          </div>
          <div className="htb-box">
            <span className="htb-num">{timeLeft.minutes}</span>
            <span className="htb-lbl">Min</span>
          </div>
          <div className="htb-box htb-active">
            <span className="htb-num">{timeLeft.seconds}</span>
            <span className="htb-lbl">Seg</span>
          </div>
        </div>

        <div className="htb-action">
          <Link href="/eventos" className="htb-btn">
            Participar ahora &rarr;
          </Link>
        </div>
      </div>

      <style jsx>{`
        .countdown-bar-wrap {
          width: 100%;
          background: #0b1115;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding: 30px 0;
          margin: 60px 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .countdown-bar-container {
          max-width: 1920px;
          margin: 0 auto;
          padding: 0 var(--side-space);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .htb-info {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-shrink: 0;
        }

        .htb-icon {
          font-size: 42px;
          line-height: 1;
        }

        .htb-title {
          font-size: 24px;
          font-weight: 900;
          color: #fff;
          margin: 0;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        .htb-date {
          font-size: 14px;
          font-weight: 800;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
          margin-top: 4px;
        }

        .htb-timers {
          display: flex;
          gap: 12px;
        }

        .htb-box {
          background: #090b0d;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 80px;
          padding: 14px 8px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }

        .htb-active {
          border-color: var(--accent);
          background: rgba(0, 255, 127, 0.03);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 255, 127, 0.05);
        }

        .htb-num {
          font-size: 32px;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          letter-spacing: -1px;
        }

        .htb-active .htb-num {
          color: var(--accent);
          text-shadow: 0 0 15px rgba(0, 255, 127, 0.4);
        }

        .htb-lbl {
          font-size: 10px;
          font-weight: 800;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }

        .htb-btn {
          background: var(--accent);
          color: #0b0f12;
          font-weight: 800;
          font-size: 15px;
          padding: 14px 28px;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(0, 255, 127, 0.2);
          text-decoration: none;
        }

        .htb-btn:hover {
          background: var(--accent-700);
          box-shadow: 0 0 25px rgba(0, 255, 127, 0.4);
          transform: translateY(-2px);
        }

        @media (max-width: 1100px) {
          .countdown-bar-container {
            flex-direction: column;
            text-align: center;
            gap: 30px;
          }
          .htb-info {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
