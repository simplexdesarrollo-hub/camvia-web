import { fetchHomeData } from '@/services/api';
import Header from '@/components/Header';
import PricingCards from '@/components/PricingCards';
import PremiosTable from '@/components/PremiosTable';
import Footer from '@/components/Footer';

export default async function PlanesPage() {
  const data = await fetchHomeData();
  const packages = data?.package ? [...data.package].sort((a, b) => a.id - b.id) : [];

  return (
    <>
      <Header />
      
      <main style={{ paddingTop: '130px', minHeight: '100vh', paddingBottom: '60px' }}>
        <PricingCards packages={packages} />
        
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <PremiosTable />
          
          {/* Proximamente Section (Vanilla CSS version) */}
          <div className="socios-section">
            <span className="proximamente-badge">
                Próximamente
            </span>
            <h4 className="socios-title">
                Nivel de <span>Socios</span>
            </h4>
            <p className="socios-desc">
                Al suscribirte participarás en sorteos exclusivos según tu nivel de socio.<br />
                Quienes se unan desde el inicio podrán acceder a más sorteos exclusivos.
            </p>
            
            <a href="#planes" className="btn-socios-neon">
                <div className="btn-inner">
                    <span className="btn-text">Activa Tu Suerte</span>
                    <div className="btn-arrow">
                        <i className="ph-bold ph-arrow-right"></i>
                    </div>
                </div>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
