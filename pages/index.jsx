import { useState, useRef, useEffect } from 'react';
import { useRouter, Router } from 'next/router';
import { NavBar } from '../components/NavBar';
import { Subtitle, Title } from '../components/Content/Title';
import Wrapper from '../components/wrapper/Main';
import Section from '../components/wrapper/Section';
import { P } from '../components/Content/Text';
import { Image } from '../components/Image';

const useIntersectionObserver = (
  elementsRefs = [],
  { root = null, threshold = '0', rootMargin = '0%', freezeOnceVisible = false }
) => {
  const [entry, setEntry] = useState();
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]) => {
    setEntry(entry);
  };

  // console.log('elements', elementsRefs);

  useEffect(() => {
    const node = elementsRefs?.current?.[0]; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    for (const element of elementsRefs.current) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [elementsRefs, JSON.stringify(threshold), root, rootMargin, frozen]);
  return entry;
};

export default function Home() {
  const articlesRefs = useRef([]);
  const router = useRouter();
  const entry = useIntersectionObserver(articlesRefs, {
    threshold: '.5',
    rootMargin: '45%',
  });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (!entry) return;
    if (!isVisible) return;
    const elementId = entry?.target.getAttribute('id');
    console.log(elementId);
    router.replace(`#${elementId}`, undefined, {
      shallow: true,
      scroll: false,
    });
  }, [entry]);

  return (
    <Wrapper
      className={
        'md:grid md:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] pt-12 px-16 gap-8 relative top-20'
      }
    >
      <NavBar />
      <main className="flex flex-col gap-12 pb-32 md:pb-20">
        {['ceop', 'protecciones'].map((elId, idx) => (
          <article
            ref={(el) => (articlesRefs.current[idx] = el)}
            key={elId}
            id={elId}
            className="flex flex-col gap-4 h-fit"
          >
            <Title>CEOP</Title>
            <Image
              width={375}
              height={300}
              src={'/images/logo/avif/test_2.avif'}
              priority
              lazy={false}
            />
            <Section>
              <Subtitle>¿Qué es CEOP?</Subtitle>
              <P>
                Calidad de Energía Orientada a proceso es un sistema único
                desarrollado por nosotros, donde medimos los parámetros de CE de
                norma internacional y el resto de perturbaciones que no está en
                la norma pero que afectan los equipos electrónicos.Por eso
                depende de qué máquina y que aplicación es el enfoque que vamos
                a usar.
              </P>
            </Section>
            <Section>
              <Subtitle>Pasos: ¿Cómo lo aplica?</Subtitle>
              <P>
                Medimos en la máquina, nos juntamos en una reunión y armamos un
                plan en etapa de mejora continua .
              </P>
            </Section>
          </article>
        ))}
        {/* <article id="protecciones" className="flex flex-col gap-4 h-full">
          <Title>Protecciones</Title>
          <Section>
            <Image width={500} height={400} src={'/images/test_1.png'} />
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
        </article> */}
      </main>
    </Wrapper>
  );
}
