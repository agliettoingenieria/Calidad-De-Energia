import Head from 'next/head';
import { Header } from '../Header';

export default ({ children, className }) => (
  <>
    <Head>
      <meta
        name="description"
        content="Calidad de energia orientada a procesos"
      />
      <meta
        name="keywords"
        content="Sinetamer, armónicos, sobretensión, Ruido eléctrico, eventos eléctricos, Transitorios, Sinetamer, comsys, filtor, dps, suppressor"
      />
      <title>Calidad De Energía</title>
    </Head>
    <Header />
    <div className={className}>{children}</div>
  </>
);
