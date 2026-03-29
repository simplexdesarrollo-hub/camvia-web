import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Particles from '../components/Particles';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-title' });
const cinzel = ({ subsets: ['latin'], weight: ['700', '900'] }); // Note: Next.js fonts need weight for some fonts
// Actually, better use standard Google Fonts import if it's easier or just add it to head.
// I'll add it to head in page.tsx to avoid complex Next.js font setup for now if not needed globally.


export const metadata: Metadata = {
  title: 'CAMVIA – Futuro 2026',
  description: 'Participa y gana los mejores premios!',
  icons: {
    icon: '/images/logos/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="carbon" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script src="https://unpkg.com/@phosphor-icons/web" async></script>
      </head>
      <body>
        {/* Background elements injected globally */}
        <div className="neon-grid-wrap"><div className="neon-grid"></div></div>
        <div className="orb a" aria-hidden="true"></div>
        <div className="orb b" aria-hidden="true"></div>
        <div className="scanline" aria-hidden="true"></div>
        <Particles />

        {children}
      </body>
    </html>
  );
}
