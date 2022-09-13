import { useState, useRef, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { NavBar } from '../components/NavBar';
import { Subtitle, Title } from '../components/Content/Title';
import Wrapper from '../components/wrapper/Main';
import Section from '../components/wrapper/Section';
import { P } from '../components/Content/Text';
import { Image } from '../components/Image';

const ARTICLES = [
  {
    title: 'CEOP',
    text: null,
    image: '/images/logo/avif/test_2.avif',
    sections: [
      {
        title: '¿Qué es CEOP?',
        text: 'Calidad de Energía Orientada a proceso es un sistema único desarrollado por nosotros, donde medimos los parámetros de CE de norma internacional y el resto de perturbaciones que no está en la norma pero que afectan los equipos electrónicos.Por eso depende de qué máquina y que aplicación es el enfoque que vamos a usar.',
      },
      {
        title: '¿Pasos, como lo aplica?',
        text: 'Medimos en la máquina, nos juntamos en una reunión y armamos un plan en etapa de mejora continua ',
      },
    ],
  },
  {
    title: 'Protecciones',
    text: null,
    image: null,
    sections: [
      {
        title: 'Supresor de transitorios y filtra AF Sinetamer',
        text: `Filtro de Atenuación de Frecuencia (FAF) con Supresor de Transitorios Incorporado (SST).</br>
        Garantía Total por 25 años.</br>
        Origen USA.</br>
        `,
      },
      {
        title: 'USO',
        text: 'Protección de equipos electrónicos (PLC, Driver, Motores, PC).',
      },
    ],
  },
  {
    title: 'AGLIETTO INGENIERA®',
    text: `Filtro de Súper Aislación (PDM).</br>4 Etapas de Filtrado (Aislación / N-G, Modo Común, Transitorios, Tuido hasta 100kHz).</br>Conexión Serie.</br>Origen Argentina (tecnología USA).`,
    image: null,
    sections: [
      {
        title: 'USO',
        text: 'Protección de equipos de control (Detectores de Metales, Fechadoras, Balanzas de Carga).',
      },
    ],
  },

  {
    title: 'SCHNEIDER ECOXPERT',
    text: 'Brindamos soluciones para eficiencia energética y calidad de energía con un equipo de expertos único en Latam.',
    image: null,
    sections: null,
  },
  {
    title: 'LAS MARCAS LÍDERES EN SOLUCIONES DE CE',
    text: 'Desde baterías, UPS, filtro de flickr, filtros de línea, bobinas de impedancia, filtros de flicker, hasta filtros para desbalance y compensadores de estado sonido líderes a nivel mundial para brindar soluciones a TODOS los eventos de energía.',
    image: null,
    sections: null,
  },
];
const removeAcents = (str) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const LIST_OF_LINKS = ARTICLES.map((value) =>
  removeAcents(value['title'].replace(/ /gi, '-').replace('®', ''))
);
console.log(LIST_OF_LINKS);
const useIntersectionObserver = (
  elementsRefs = [],
  { root = null, threshold = '0', rootMargin = '0%', freezeOnceVisible = false }
) => {
  const [entry, setEntry] = useState();
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]) => {
    setEntry(entry);
  };

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
    threshold: '.8',
    rootMargin: '15%',
  });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (!entry) return;
    if (!isVisible) return;
    const t = setTimeout(() => {
      const elementId = entry?.target.getAttribute('id');
      console.log(elementId);
      router.replace(`#${elementId}`, undefined, {
        shallow: false,
        scroll: false,
      });
    }, 500);
    return () => {
      clearTimeout(t);
    };
  }, [entry]);

  return (
    <Wrapper
      className={
        'md:grid md:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] pt-12 px-16 gap-8 relative top-20'
      }
    >
      <NavBar links={LIST_OF_LINKS} />
      <main className="flex flex-col gap-12 pb-32 md:pb-20">
        {ARTICLES.map((element, idx) => (
          <article
            key={element.title}
            id={removeAcents(
              element.title
                .toLocaleLowerCase()
                .replace(/ /gi, '-')
                .replace('®', '')
            )}
            ref={(el) => (articlesRefs.current[idx] = el)}
            className="flex flex-col gap-4 h-fit"
          >
            <Title>{element.title}</Title>
            {element.text && <P>{element.text}</P>}
            {element.image && (
              <Image
                width={375}
                height={300}
                src={element.image}
                priority
                lazy={false}
              />
            )}
            {element.sections?.map((elementSection, idx) => (
              <Fragment key={elementSection.title}>
                <Section>
                  <Subtitle>{elementSection.title}</Subtitle>
                  <P>{elementSection.text}</P>
                </Section>
              </Fragment>
            ))}
          </article>
        ))}
      </main>
    </Wrapper>
  );
}
