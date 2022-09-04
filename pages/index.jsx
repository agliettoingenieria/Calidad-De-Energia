import { NavBar } from '../components/NavBar';
import { Subtitle, Title } from '../components/Content/Title';
import Wrapper from '../components/wrapper/Main';
import Section from '../components/wrapper/Section';
import { P } from '../components/Content/Text';
import Image from 'next/image';

export default function Home() {
  return (
    <Wrapper
      className={
        'md:grid md:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] pt-12 px-16 gap-8 relative top-20'
      }
    >
      <NavBar />
      <main className="flex flex-col gap-12 pb-32 md:pb-20">
        <article id="ceop" className="flex flex-col gap-4 h-fit">
          <Title>CEOP</Title>
          <Section>
            <Subtitle>¿Qué es CEOP?</Subtitle>
            <P>
              Calidad de Energía Orientada a proceso es un sistema único
              desarrollado por nosotros, donde medimos los parámetros de CE de
              norma internacional y el resto de perturbaciones que no está en la
              norma pero que afectan los equipos electrónicos.Por eso depende de
              qué máquina y que aplicación es el enfoque que vamos a usar.
            </P>
          </Section>
          <Section>
            <Subtitle>Pasos: ¿Cómo lo aplica?</Subtitle>
            <P>
              Medimos en la máquina, nos juntamos en una reunión y armamos un
              plan en etapa de mejora continua .
            </P>
            <Image width={500} height={400} src={'/images/img-1.png'} />
          </Section>
        </article>
        <article id="protecciones" className="flex flex-col gap-4 h-full">
          <Title>Protecciones</Title>
          <Section>
            <Subtitle>SINETAMER</Subtitle>
            <P>
              Filtro de Atenuación de Frecuencia (FAF) con Supresor de
              Transitorios Incorporado (SST).
              <br />
              Garantía Total por 25 años.
              <br />
              Origen USA.
            </P>
          </Section>
          <Section>
            <Subtitle>Uso</Subtitle>
            <P>
              Protección de equipos electrónicos (PLC, Driver, Motores, PC).
            </P>
          </Section>
          <Section>
            <Subtitle>AGLIETTO INGENIERA®:</Subtitle>
            <P>
              Filtro de Súper Aislación (PDM). <br />
              4 Etapas de Filtrado (Aislación / N-G, Modo Común, Transitorios,
              Tuido hasta 100kHz). <br />
              Conexión Serie. <br />
              Origen Argentina (tecnología USA).
            </P>
          </Section>
        </article>
      </main>
    </Wrapper>
  );
}
