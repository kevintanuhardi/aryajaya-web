import type { ProductCategory } from './categories';
import { productCategories } from './categories';

export type Product = {
  slug: string;
  name: string;
  categoryId: ProductCategory['id'];
  shortDescription: string;
  body: string;
  highlights: string[];
  specifications: Record<string, string>;
  manufacturer: string;
  source: string;
  heroImage: string;
  sampleData: boolean;
};

export const products: Product[] = [
  {
    slug: 'minimally-invasive-spine-system',
    name: 'MIS Spine Stabilization System',
    categoryId: 'spine',
    shortDescription: 'Implan pedicle screw siap navigasi untuk stabilisasi tulang belakang minimal invasif.',
    body:
      'Sistem pedicle screw bertumpu pada profil rendah dengan kompatibilitas navigasi intraoperatif. Dirancang untuk meminimalkan paparan radiasi sambil mempertahankan stabilitas struktural.',
    highlights: [
      'Profil rendah dan kompatibel fluoroskopi',
      'Driver quick-lock untuk waktu operasi singkat',
      'Kompatibel dengan navigasi 3D intraoperatif'
    ],
    specifications: {
      Material: 'Titanium alloy Ti-6Al-4V',
      Diameter: '4.5 mm - 7.5 mm',
      Panjang: '25 mm - 55 mm',
      Sterilisasi: 'Gamma pre-sterilized'
    },
    manufacturer: 'Based on Medtronic Minimally Invasive Spine portfolio',
    source: 'https://www.medtronic.com/us-en/healthcare-professionals/products/spinal-orthopaedic.html',
    heroImage:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    sampleData: true
  },
  {
    slug: 'trauma-lock-plating',
    name: 'Trauma Lock Plating System',
    categoryId: 'orthopedic',
    shortDescription: 'Sistem plating humerus & tibia dengan screw locking ganda untuk fiksasi trauma kompleks.',
    body:
      'Mengacu pada sistem plating DePuy Synthes VA-LCP dengan slot variabel sehingga ahli bedah dapat melakukan fiksasi sesuai anatomi pasien.',
    highlights: [
      'Kontur anatomi siap pakai',
      'Slot kombinasi kompresi dan locking',
      'Instrumen modular ringan'
    ],
    specifications: {
      Material: 'Stainless Steel 316L / Titanium',
      Indikasi: 'Fraktur intra-artikular dan ekstra-artikular',
      Ketebalan: '2.7 mm - 4.5 mm',
      Sterilisasi: 'Steam sterilizable set'
    },
    manufacturer: 'Based on DePuy Synthes VA-LCP portfolio',
    source: 'https://www.jnjmedtech.com/',
    heroImage:
      'https://images.unsplash.com/photo-1580281780460-82d277b0d263?auto=format&fit=crop&w=1200&q=80',
    sampleData: true
  },
  {
    slug: 'surgical-navigation-console',
    name: 'Surgical Navigation Console',
    categoryId: 'navigation',
    shortDescription: 'Konsol navigasi ruang operasi untuk prosedur tulang belakang & ortopedi presisi.',
    body:
      'Terinspirasi dari platform Brainlab Curve Navigation yang menawarkan tracking optik dan integrasi imaging multi-modality.',
    highlights: [
      'Tracking inframerah 360°',
      'Integrasi DICOM dan O-arm',
      'Workflow panduan instrumentasi'
    ],
    specifications: {
      Layar: '32" UHD medical grade',
      Tracking: 'Optical active marker',
      Port: 'HDMI, USB 3.0, Ethernet',
      Power: '220V / 50Hz'
    },
    manufacturer: 'Based on Brainlab Curve Navigation',
    source: 'https://www.brainlab.com/surgery-products/navigation/',
    heroImage:
      'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=80',
    sampleData: true
  },
  {
    slug: 'cervical-cage-system',
    name: 'Cervical Interbody Cage',
    categoryId: 'spine',
    shortDescription: 'Cage PEEK untuk fusi servikal anterior dengan marker radiopak.',
    body:
      'Dirancang mengikuti anatomi servikal, menyediakan stabilitas primer dan menjaga lordosis. Inspirasi dari portofolio Globus Medical ALIF/ACDF.',
    highlights: ['Marker tantalum', 'Permukaan texturing', 'Pilihan lordosis 6°'],
    specifications: {
      Material: 'PEEK Optima',
      Tinggi: '5–9 mm',
      Footprint: '12 x 14 mm',
      Sterilisasi: 'Gamma sterilized'
    },
    manufacturer: 'Based on Globus Medical ACDF systems',
    source: 'https://www.globusmedical.com/',
    heroImage:
      'https://images.unsplash.com/photo-1582719478191-2ba9c8c81b19?auto=format&fit=crop&w=1200&q=80',
    sampleData: true
  },
  {
    slug: 'locking-plate-ankle',
    name: 'Ankle Locking Plate Set',
    categoryId: 'orthopedic',
    shortDescription: 'Pelat distal tibia dengan slot variabel untuk fraktur pergelangan kaki.',
    body:
      'Profil rendah untuk meminimalkan iritasi jaringan lunak, terinspirasi dari sistem Zimmer Biomet pergelangan kaki.',
    highlights: ['Slot variabel', 'Profil rendah', 'Screw dual core'],
    specifications: {
      Material: 'Titanium alloy',
      Panjang: '60–140 mm',
      Tebal: '1.6 mm',
      Sterilisasi: 'Steam sterilizable set'
    },
    manufacturer: 'Based on Zimmer Biomet ankle plating',
    source: 'https://www.zimmerbiomet.com/',
    heroImage:
      'https://images.unsplash.com/photo-1585241645927-c7a8e5840c86?auto=format&fit=crop&w=1200&q=80',
    sampleData: true
  },
  {
    slug: 'bone-graft-substitute',
    name: 'Synthetic Bone Graft',
    categoryId: 'orthopedic',
    shortDescription: 'CPC/β-TCP bone substitute untuk filling defek tulang.',
    body:
      'Granul berpori dengan resorbsi terkontrol, analog dengan produk NovaBone/ChronOS untuk penggunaan ortopedi dan trauma.',
    highlights: ['Porositas terhubung', 'Resorbsi bertahap', 'Steril gamma'],
    specifications: {
      Komposisi: 'Kalsium fosfat',
      Ukuran: '0.5–3 mm granul',
      Indikasi: 'Defek tulang non-load bearing',
      Sterilisasi: 'Gamma sterilized'
    },
    manufacturer: 'Based on NovaBone grafts',
    source: 'https://www.novabone.com/',
    heroImage:
      'https://images.unsplash.com/photo-1582719478181-2f88b26c98cd?auto=format&fit=crop&w=1200&q=80',
    sampleData: true
  },
  {
    slug: 'vertebral-body-replacement',
    name: 'Expandable VBR Cage',
    categoryId: 'spine',
    shortDescription: 'Vertebral body replacement expandable untuk trauma/onkologi torakolumbal.',
    body:
      'Permukaan titanium porous untuk osteointegrasi dan mekanisme ratchet untuk ekspansi in situ.',
    highlights: ['Expandable', 'Porous titanium', 'Endplate lordosis'],
    specifications: {
      Material: 'Titanium porous',
      Rentang: '20–80 mm expandable',
      Diameter: '22–30 mm',
      Sterilisasi: 'Steam sterilizable set'
    },
    manufacturer: 'Based on NuVasive X-Core style devices',
    source: 'https://www.nuvasive.com/',
    heroImage:
      'https://images.unsplash.com/photo-1505672678657-cc7037095e2c?auto=format&fit=crop&w=1200&q=80',
    sampleData: true
  },
  {
    slug: 'surgical-drill-system',
    name: 'Surgical Power Drill',
    categoryId: 'navigation',
    shortDescription: 'Sistem bor bedah elektrik untuk ortopedi dengan opsi attachment saw.',
    body:
      'Set bor multi-kecepatan dengan chuck cepat dan pilihan attachment untuk trauma dan rekonstruksi.',
    highlights: ['Quick-connect', 'Baterai steril', 'Torque terukur'],
    specifications: {
      Kecepatan: '0–1200 rpm',
      Tenaga: 'Baterai steril',
      Material: 'Stainless steel medical grade',
      Sterilisasi: 'Steam'
    },
    manufacturer: 'Based on Stryker System 8 concepts',
    source: 'https://www.stryker.com/',
    heroImage:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    sampleData: true
  }
];

export const getCategory = (id: ProductCategory['id']) =>
  productCategories.find((category) => category.id === id);
