import Link from 'next/link';

export default function MegaBanner() {
  return (
    <section className="mega-banner">
      <div className="giant-gift-wrapper">
        <div className="gift-glow"></div>
        <div className="giant-gift">🎁</div>
      </div>
      <h1 className="banner-title">¡El regalo más grande<br />llega en 2026!</h1>
      <p className="banner-subtitle">
        Estamos preparando algo monumental. El sorteo oficial de Camvia comenzará en <strong>Agosto 2026</strong>.
        Aquí comienza tu lugar para ganar.
      </p>
      <Link 
        href="#planes"
        className="btn btn-accent px-5 py-1-5 text-sm uppercase font-bold tracking-widest mt-6"
      >
        Quiero ser parte
      </Link>
      <div className="scroll-down">↓ Desliza para ver más ↓</div>
    </section>
  );
}
