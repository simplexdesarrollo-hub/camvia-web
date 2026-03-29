'use client';

export default function PremiosTable() {
  return (
    <div className="mt-8 w-full flex flex-col items-center relative z-20">
      <div className="table-wrapper expanded">
        <div className="w-full flex flex-col items-center">
          
          {/* Header Texts (Vanilla CSS) */}
          <div className="mb-10 mt-4 text-center max-w-[900px] px-4">
            <h3 className="premios-header-title">
              Los premios <span>no se detienen</span>
            </h3>
            <p className="premios-header-sub">
              Cada nivel suma nuevas oportunidades de ganar.
            </p>
          </div>

          {/* Table */}
          <div className="table-container">
            <div className="overflow-x-auto">
              <table className="premios-table">
                <thead>
                  <tr>
                    <th>
                      <div className="text-left"><span className="text-white text-[11px] font-black uppercase">Nivel de Premios</span></div>
                    </th>
                    <th>
                      <div className="tier-col" style={{ color: '#00ff00' }}>
                        <span>Total</span>
                        <sub>Bolsa</sub>
                      </div>
                    </th>
                    <th>
                      <div className="tier-col" style={{ color: '#00a982' }}>
                        <i className="ph-fill ph-gift text-lg mb-1"></i>
                        <span>Base</span>
                      </div>
                    </th>
                    <th>
                      <div className="tier-col" style={{ color: '#007e00' }}>
                        <i className="ph-fill ph-gift text-lg mb-1"></i>
                        <span>Mediano</span>
                      </div>
                    </th>
                    <th>
                      <div className="tier-col" style={{ color: '#2db900' }}>
                        <i className="ph-fill ph-gift text-lg mb-1"></i>
                        <span>Grande</span>
                      </div>
                    </th>
                    <th>
                      <div className="tier-col" style={{ color: '#00ff00' }}>
                        <i className="ph-fill ph-gift text-lg mb-1"></i>
                        <span>Estelar</span>
                      </div>
                    </th>
                    <th>
                      <div className="tier-col" style={{ color: '#ff00ff' }}>
                        <i className="ph-fill ph-gift text-lg mb-1"></i>
                        <span>Gran Camvia</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { nivel: 1, total: 30 },
                    { nivel: 2, total: 30 },
                    { nivel: 3, total: 60 },
                    { nivel: 4, total: 90 },
                    { nivel: 5, total: 120 },
                    { nivel: 6, total: 160, ultimate: true },
                    { nivel: 7, total: 400, ultimate: true },
                    { nivel: 8, total: 800, ultimate: true },
                  ].map((row) => (
                    <tr key={row.nivel}>
                      <td className="col-level">Nivel {row.nivel}</td>
                      <td><span className="total-badge">{row.total}</span></td>
                      <td style={{ color: '#00a982' }}>-</td>
                      <td style={{ color: '#007e00' }}>-</td>
                      <td style={{ color: '#2db900' }}>-</td>
                      <td style={{ color: '#00ff00' }}>-</td>
                      <td>
                        {row.ultimate ? <span className="ultimate-pill">-</span> : <span style={{ opacity: 0.3 }}>-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Description Footer (Abajo de la tabla) */}
          <div className="mt-4 text-center px-4">
            <p className="premios-footer-desc">
              <span className="text-neon-green font-black">CAMVIA</span> está diseñado para crecer constantemente. A medida que avanzamos, aumentamos la cantidad de premios mensuales para que más participantes puedan convertirse en ganadores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
