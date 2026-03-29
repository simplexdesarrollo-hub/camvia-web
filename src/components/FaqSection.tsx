export default function FaqSection() {
  return (
    <section className="faq-section container">
      <div className="text-center mb-12 mt-6 relative z-20 px-4">
        <h2 className="font-title text-4xl sm:text-5xl font-black mb-4 text-white tracking-tight drop-shadow-lg">
          Preguntas <span className="text-accent">Frecuentes</span>
        </h2>
      </div>

      <div className="faq-list">
        <details className="faq-item">
          <summary>¿Qué es CAMVIA?</summary>
          <div className="faq-content flex flex-col gap-1">
            <span>CAMVIA es una plataforma digital donde puedes jugar, participar y acceder a oportunidades reales de ganar premios.</span>
            <span>Puedes participar y llevarte premios gratis a través de nuestros sistemas de Juegos y Bingo, o formar parte de sorteos exclusivos mediante suscripción, donde se concentran mayores premios.</span>
            <span>CAMVIA está diseñada para todas las personas que buscan participar, disfrutar y tener la oportunidad de ganar bajo un sistema claro y transparente.</span>
            <span>CAMVIA es tu lugar para ganar.</span>
          </div>
        </details>
        <details className="faq-item">
          <summary>¿Cómo funciona DADOS?</summary>
          <div className="faq-content flex flex-col gap-1">
            <span>DADOS es un sistema basado en acumulación de puntos y ranking. Los participantes compiten para subir posiciones, y los premios se asignan según el puesto alcanzado al cierre oficial de cada jornada.</span>
          </div>
        </details>
        <details className="faq-item">
          <summary>¿Qué es el Golden Ticket?</summary>
          <div className="faq-content flex flex-col gap-1">
            <span>El Golden Ticket es la forma de participar en los sorteos de eventos especiales en CAMVIA.</span>
            <span>Cada Golden Ticket equivale a una oportunidad dentro del sorteo del evento activo.</span>
            <span>Puedes obtenerlos dentro de la plataforma o mediante negocios afiliados autorizados.</span>
          </div>
        </details>
        <details className="faq-item">
          <summary>¿Qué incluyen los planes de lanzamiento?</summary>
          <div className="faq-content flex flex-col gap-1">
            <span>Los planes de lanzamiento te permiten unirte antes del inicio oficial del sorteo y acceder a beneficios desde el momento de activación.</span>
            <span>Al formar parte, obtienes:<br />
              • <strong>Dados:</strong> Rango VIP<br />
              • <strong>Bingo:</strong> 1 cartilla adicional<br />
              • <strong>Regalos:</strong> Asignación del nivel de Socio Fundador</span>
            <span>Tu membresía comenzará oficialmente con el primer sorteo programado.</span>
          </div>
        </details>
        <details className="faq-item">
          <summary>¿Qué es Socio Fundador?</summary>
          <div className="faq-content flex flex-col gap-1">
            <span>El Socio Fundador es un nivel de socio en CAMVIA exclusivo para quienes se suscriben en la etapa inicial de la plataforma.</span>
            <span>Este nivel te brinda más oportunidades de ganar premios dentro de las dinámicas y sorteos, aumentando tus probabilidades frente a quienes se unan más adelante.</span>
            <span>Ser parte desde el inicio te da una mayor ventaja a medida que la comunidad crece.</span>
            <span>Próximamente se habilitarán nuevos niveles de socios.</span>
          </div>
        </details>
        <details className="faq-item">
          <summary>¿Cómo funcionan las bonificaciones en DADOS?</summary>
          <div className="faq-content flex flex-col gap-1">
            <span>Los participantes pueden recoger diamantes en tres horarios diarios (6:00 AM, 12:00 PM y 5:00 PM). Cada diamante es un lanzamiento que suma puntos a tu score.</span>
          </div>
        </details>
      </div>
    </section>
  );
}
