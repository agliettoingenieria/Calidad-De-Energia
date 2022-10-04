import { useState, useRef, useEffect, Fragment } from 'react';
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
    desc: {
      title: '¿Qué es CEOP?',
      text: 'Es un diagnóstico predictivo en electrónica (un análisis de sangre de la instalación eléctrica) que nos permite conocer los eventos que están afectando la maquina y predecir desgaste potenciales y fallas.',
    },
    image: '/images/IMG_7856.jfif',
    sections: [
      {
        title: '¿Dónde se realiza?',
        text: 'La medición se realiza en el tablero de la máquina a proteger, en donde medimos detalladamente todos los parámetros de calidad de energía con la profundidad necesaria para definir que eventos afectan o no a la electrónica y a los componentes de este punto. Para ello utilizamos normas Internacionales y contemplamos el resto de perturbaciones que no está en la norma pero que afectan los equipos electrónicos (según fabricantes y 40 años haciendo Calidad de Energía), es por eso depende de qué máquina y qué aplicación es el enfoque que vamos a usar.',
      },
      {
        title: '¿Cómo lo implementamos?',
        text: 'En 3 sencillos pasos lo implementamos: Medimos en la máquina, nos juntamos en una reunión explicando cada punto observado y armamos un plan en etapas de mejora continua. El resultado nunca más roturas.',
      },
    ],
  },
  {
    title: 'Sinetamer',
    desc: {
      title: null,
      text: null,
    },
    image: '/images/IMG_7861.jfif',
    sections: [
      {
        title: 'Supresor de transitorios y filtra AF Sinetamer',
        text: `Filtro de Atenuación de Frecuencia (FAF) con Supresor de Transitorios Incorporado (SST).
        Garantía Total por 25 años.
        Origen USA.
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
    text: `Filtro de Súper Aislación (PDM).
4 Etapas de Filtrado (Aislación / N-G, Modo Común, Transitorios, Tuido hasta 100kHz).Conexión Serie.Origen Argentina (tecnología USA).`,
    image: '/images/IMG_7862.jfif',
    sections: [
      {
        title: 'USO',
        text: 'Protección de equipos de control (Detectores de Metales, Fechadoras, Balanzas de Carga).',
      },
    ],
  },

  // {
  //   title: 'SCHNEIDER ECOXPERT',
  //   desc: {
  //     title: null,
  //     text: 'Brindamos soluciones para eficiencia energética y calidad de energía con un equipo de expertos único en Latam.',
  //   },
  //   image: '/images/IMG_7867.jfif',
  //   sections: null,
  // },
  {
    title: 'LAS MARCAS LÍDERES EN SOLUCIONES DE CE',
    text: 'Desde baterías, UPS, filtro de flickr, filtros de línea, bobinas de impedancia, filtros de flicker, hasta filtros para desbalance y compensadores de estado sonido líderes a nivel mundial para brindar soluciones a TODOS los eventos de energía.',
    image: '/images/IMG_7868.jfif',
    sections: null,
  },
];
const removeAcents = (str) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const LIST_OF_LINKS = ARTICLES.map((value) =>
  removeAcents(value['title'].replace(/ /gi, '-').replace('®', ''))
);
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
  const entry = useIntersectionObserver(articlesRefs, {
    threshold: '.8',
    rootMargin: '15%',
  });

  return (
    <Wrapper
      className={
        'md:grid md:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] pt-12 px-16 gap-8 relative top-20'
      }
    >
      <NavBar
        currentArticleId={entry?.target.getAttribute('id')}
        links={LIST_OF_LINKS}
      />
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
            {element.desc && (
              <Section>
                {element.desc.title && (
                  <Subtitle>{element.desc.title}</Subtitle>
                )}
                {element.desc.text && <P>{element.desc.text}</P>}
              </Section>
            )}
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
