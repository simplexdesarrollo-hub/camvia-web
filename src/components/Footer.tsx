export default function Footer() {
  return (
    <>
      {/* FOOTER INSTITUCIONAL */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <span className="brand-footer">CAMVIA</span>
              <p>
                Plataforma digital de juegos, dinámicas y sorteos diseñada para ofrecer oportunidades reales de ganar, con reglas claras y premios confirmados.
              </p>
            </div>
            
            <div className="footer-col">
              <h3>LEGAL</h3>
              <ul className="footer-links">
                <li><a href="#">Términos y Condiciones</a></li>
                <li><a href="#">Política de Privacidad</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>CONTACTO</h3>
              <ul className="footer-links info-links">
                <li>Lima, Perú</li>
                <li><a href="mailto:soporte@camvia.pe">soporte@camvia.pe</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>COMUNIDAD</h3>
              <ul className="footer-links">
                <li><a href="#">Ganadores Oficiales</a></li>
              </ul>
            </div>
          </div>
          
          <div className="bottom-bar">
            <div className="divider-footer"></div>
            <p>&copy; 2026 CAMVIA &middot; Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </>
  );
}
