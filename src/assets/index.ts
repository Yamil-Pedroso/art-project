import hero from "./images/hero/hero.png";

import art1 from "./images/art-works/art1.jpg";
import art2 from "./images/art-works/art2.jpg";
import art3 from "./images/art-works/art3.webp";

import pet1 from "./images/pets/pet1.webp";
import pet2 from "./images/pets/pet2.webp";
import pet3 from "./images/pets/pet3.jpg";

import exhib1 from "./images/exhibitions-collectors/exhib1.jpg";
import exhib2 from "./images/exhibitions-collectors/exhib2.jpeg";
import exhib3 from "./images/exhibitions-collectors/exhib3.jpg";
import exhib4 from "./images/exhibitions-collectors/exhib4.jpeg";
import exhib5 from "./images/exhibitions-collectors/exhib5.jpg";
import exhib6 from "./images/exhibitions-collectors/exhib6.jpg";
import exhib7 from "./images/exhibitions-collectors/exhib7.jpg";
import exhib8 from "./images/exhibitions-collectors/exhib8.jpg";
import exhib9 from "./images/exhibitions-collectors/exhib9.jpg";
import exhib10 from "./images/exhibitions-collectors/exhib10.jpeg";
import exhib11 from "./images/exhibitions-collectors/exhib11.jpeg";
import exhib12 from "./images/exhibitions-collectors/exhib12.jpeg";
import exhib13 from "./images/exhibitions-collectors/exhib13.jpeg";
import exhib14 from "./images/exhibitions-collectors/exhib14.jpeg";

// Master copy collection
import master1 from "./images/master-copy/mc_01.jpeg";

import digital1 from "./images/digital/digital.jpg";
import cagueiro from "./images/digital/cagueiro.jpg";
import earth from "./images/digital/earth.jpg";
import guije_rana from "./images/digital/guije_rana.jpg";
import guije from "./images/digital/guije.jpg";
import dwarf from "./images/digital/dwarf.png";
import christ from "./images/digital/christ.png";
import cat from "./images/digital/cat.png";
import ai from "./images/digital/ai.png";
import abstract from "./images/digital/Abstract.png";
import colorBoy from "./images/digital/color-boy.jpg";
import blueTone from "./images/digital/blue-tone.jpg";

import artBrush from "./images/art-brush.png";

import yamiAtelier from "./images/avatar/yami_atelier.jpg";

interface ImageAssets {
  [key: string]: string;
}

const imageAssets: ImageAssets = {
  hero,
  yamiAtelier,
  art1,
  art2,
  art3,
  exhib1,
  exhib2,
  exhib3,
  exhib4,
  exhib5,
  exhib6,
  exhib7,
  exhib8,
  exhib9,
  exhib10,
  exhib11,
  exhib12,
  exhib13,
  exhib14,
  master1,
  pet1,
  pet2,
  pet3,
  digital1,
  cagueiro,
  earth,
  guije_rana,
  guije,
  dwarf,
  christ,
  cat,
  ai,
  abstract,
  colorBoy,
  blueTone,
  artBrush,
};

export default imageAssets;
