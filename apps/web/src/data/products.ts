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
  }
];

export const getCategory = (id: ProductCategory['id']) =>
  productCategories.find((category) => category.id === id);
