import type { CVProps, ArtShowProps } from "../types/Types";
import imageAssets from "@/assets";

export const cvData: CVProps[] = [
  {
    title: "Curriculum Vitae",
    subtitle: "Artist and Designer",
    description: `I am a visual artist with over 15 years of experience in both traditional and digital art. My work has been exhibited in numerous solo and group exhibitions across Cuba, Germany, and Switzerland, reflecting a diverse and evolving artistic journey. I received my foundational training at the YETI-UNEAC Community Workshop for Artists in Havana, Cuba, where I developed not only technical skills but also a deep appreciation for art as a form of cultural and social expression. Additionally, I completed several painting courses at the prestigious National School of Fine Arts "San Alejandro" in Havana, further expanding my knowledge and practice in classical and contemporary techniques. In Cuba, I managed my own independent art gallery, a space where I exhibited and sold my artwork, while also engaging with the local community. One of the most meaningful aspects of that experience was offering free painting lessons to children in the neighborhood—sharing art as a universal language and a way to inspire creativity from a young age. Today, I live and work in Switzerland, where I continue to create and explore both physical and digital mediums. My artistic practice blends Caribbean roots with European influences, using color, form, and texture to build visual narratives that connect on a personal and emotional level.`,
    imageUrl: imageAssets.yamiAtelier,
  },
];

export const artShow: ArtShowProps = {
  soloShow: {
    header: "Solo Show",
    shows: [
      {
        title: '"Reflejos"',
        year: 2013,
        info: `. Juanito Hernández Gallery, National Educational Channel (Canal Educativo Nacional), Havana, Cuba.`,
      },
      {
        title: '"Reflejos del alma"',
        year: 2015,
        info: ". Casa de Artistas y Creadores (House of Artists and Creators), Havana, Cuba.",
      },
      {
        title: '"Mundus Vita"',
        year: 2018,
        info: ". A visual and artistic progression of the project. A project of a different kind, organizing direct assistance for self-help. Zurich, Switzerland.",
      },
    ],
  },
  groupShow: {
    header: "Group Show",
    shows: [
      {
        title: '"Apertura"',
        year: 2013,
        info: ". Gallery of Canal Habana, in commemoration of the birth of Cuba’s national hero José Martí, Havana, Cuba.",
      },
      {
        title: '"Símbolo"',
        year: 2013,
        info: ". Comprehensive Training Center of the Ministry of the Interior, Havana, Cuba.",
      },

      {
        title: '"Tribute to the 54th Anniversary of the State Security Organs"',
        year: 2013,
        info: ". Comprehensive Training Center of the Ministry of the Interior, Havana, Cuba.",
      },
      {
        title: "Homenaje",
        year: 2013,
        info: ". National Union of Culture Workers (Sindicato Nacional de la Cultura), Havana, Cuba.",
      },
      {
        title: "Raíces",
        year: 2014,
        info: ". Yoruba Cultural Society of Cuba, Havana, Cuba.",
      },
      {
        title: "Ruptura",
        year: 2014,
        info: '. Military Higher School "Comandante Arides Estévez Sánchez", Havana, Cuba.',
      },
      {
        title: "Ruptura 2",
        year: 2014,
        info: '. Art and Friendship Gallery. Military Higher School "Comandante Arides Estévez Sánchez", Havana, Cuba.',
      },
      {
        title: "Divino Tesoro",
        year: 2015,
        info: ". Juanito Hernández Gallery, Canal Educativo Nacional – ICRT. In tribute to International Women’s Day, Havana, Cuba.",
      },
      {
        title: "RompArte, la Habana Encueros",
        year: 2015,
        info: ". Mural at the Havana Scale Model Gallery (Galería de la Maqueta de La Habana), Havana, Cuba.",
      },
      {
        title: "Mágico Encanto",
        year: 2015,
        info: ". Juanito Hernández Gallery, National Educational Channel (Canal Educativo Nacional), Havana, Cuba.",
      },
      {
        title: '"Puertas Abiertas" – "Offene Türen"',
        year: 2016,
        info: ". Cuba in Transition, presented in Berlin and later in Bonn, Germany.",
      },
    ],
  },
};
