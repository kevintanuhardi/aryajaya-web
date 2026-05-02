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
  source?: string;
  sourceLabel?: string;
  heroImage?: string;
};

export const products: Product[] = [
  {
    slug: 'visual-orthopedic-surgical-navigation-device',
    name: 'Visual Orthopedic Surgical Navigation Device',
    categoryId: 'navigation',
    shortDescription:
      'Sistem navigasi bedah ortopedi berbasis pencitraan 2D dan 3D dengan panduan real-time selama prosedur.',
    body:
      'NAVI-OR-1 menghasilkan model anatomi 3D secara instan, mendukung perencanaan operasi, dan membantu pelacakan instrumen secara real-time untuk prosedur spine dan trauma.',
    highlights: [
      'Optical tracking device dengan teknologi NDI',
      'Informasi real-time posisi implan, sudut, kedalaman, dan arah',
      'Registrasi 2D-2D, 3D-3D, dan 2D-3D multi-modal'
    ],
    specifications: {
      Tipe: 'NAVI-OR-1',
      'Aplikasi Klinis': 'Spine surgery, trauma surgery',
      'Tracking Accuracy': 'Sub-millimeter (<= 1 mm)',
      'Input Data': 'DICOM imaging data'
    },
    manufacturer: 'Visual MedTech',
    heroImage: '/images/client/products/navigation/navi-or.png'
  },
  {
    slug: 'juveno-femoral-stem-system',
    name: 'JUVENO Femoral Stem System',
    categoryId: 'arthroplasty',
    shortDescription:
      'Cementless femoral stem dengan size-specific medial curvature untuk canal matching dan stabilitas jangka panjang.',
    body:
      'JUVENO Femoral Stem System dirancang untuk total hip arthroplasty dan dapat dipadukan dengan PRIMO Acetabular System.',
    highlights: [
      'Size-specific medial curvature untuk canal matching optimal',
      'Stabilitas aksial dan rotasional yang baik',
      'Coating mendukung bone ingrowth jangka panjang'
    ],
    specifications: {
      Tipe: 'Cementless Femoral Stem (Press-fit)',
      'Neck Angle': '127° / 132°',
      'Panjang Stem': '96-126 mm',
      Aplikasi: 'Total Hip Arthroplasty (THA)'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/juveno-design-rationale-en.pdf',
    sourceLabel: 'Buka brosur JUVENO',
    heroImage: '/images/client/products/arthroplasty/juveno-femoral-stem.png'
  },
  {
    slug: 'ofit-dual-taper-femoral-stem-system',
    name: 'OFIT Dual-Taper Femoral Stem System',
    categoryId: 'arthroplasty',
    shortDescription:
      'Cementless femoral stem dengan desain dual-taper untuk stabilitas aksial dan rotasional.',
    body:
      'OFIT Dual-Taper Femoral Stem System dirancang sebagai solusi total hip yang cost-effective dan dapat dipadukan dengan FUGU Cementless Acetabular Cup System.',
    highlights: [
      'Dual-taper design untuk stabilitas optimal',
      'Optimized neck geometry untuk meningkatkan range of motion',
      'Reduced distal tip untuk mengurangi risiko thigh pain'
    ],
    specifications: {
      Tipe: 'Cementless Femoral Stem (Press-fit)',
      Size: '8.5-18',
      'Panjang Stem': '120-190 mm',
      Aplikasi: 'Total Hip Arthroplasty (THA)'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/ofit-dual-taper-femoral-stem.pdf',
    sourceLabel: 'Buka brosur OFIT',
    heroImage: '/images/client/products/arthroplasty/ofit-femoral-stem.png'
  },
  {
    slug: 'primo-acetabular-system',
    name: 'PRIMO Acetabular System',
    categoryId: 'arthroplasty',
    shortDescription:
      'Cementless cup dengan advanced locking system dan opsi bearing untuk kebutuhan total hip arthroplasty.',
    body:
      'PRIMO Acetabular System merupakan sistem acetabular cup untuk total hip arthroplasty dan dipasangkan dengan JUVENO Femoral Stem.',
    highlights: [
      'Advanced locking system',
      'Pilihan bearing untuk kebutuhan rekonstruksi hip',
      'Dirancang sebagai pasangan sistem JUVENO Femoral Stem'
    ],
    specifications: {
      Tipe: 'Cementless Acetabular Cup System',
      Aplikasi: 'Total Hip Arthroplasty (THA)',
      Pasangan: 'JUVENO Femoral Stem',
      Brand: 'B-One'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/primo-design-rationale-en.pdf',
    sourceLabel: 'Buka brosur PRIMO',
    heroImage: '/images/client/products/arthroplasty/primo-acetabular-cup.png'
  },
  {
    slug: 'fugu-cementless-acetabular-cup-system',
    name: 'FUGU Cementless Acetabular Cup System',
    categoryId: 'arthroplasty',
    shortDescription:
      'Cementless cup dengan small teeth geometry dan patented locking mechanism untuk initial stability.',
    body:
      'FUGU Cementless Acetabular Cup System merupakan sistem acetabular cup untuk total hip arthroplasty dan dipasangkan dengan OFIT Femoral Stem.',
    highlights: [
      'Small teeth geometry untuk initial stability',
      'Patented locking mechanism',
      'Dirancang sebagai pasangan sistem OFIT Femoral Stem'
    ],
    specifications: {
      Tipe: 'Cementless Acetabular Cup System',
      Aplikasi: 'Total Hip Arthroplasty (THA)',
      Pasangan: 'OFIT Femoral Stem',
      Brand: 'B-One'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/fugu-cementless-acetabular-cup.pdf',
    sourceLabel: 'Buka brosur FUGU',
    heroImage: '/images/client/products/arthroplasty/fugu-acetabular-cup.png'
  },
  {
    slug: 'mobio-total-knee-system',
    name: 'MOBIO Total Knee System',
    categoryId: 'arthroplasty',
    shortDescription:
      'Total knee replacement system dengan single radius design dan enhanced patellofemoral articulation.',
    body:
      'MOBIO Total Knee System dirancang untuk primary total knee arthroplasty dengan fleksibilitas sizing dan opsi femur narrow.',
    highlights: [
      'Single radius design untuk stabilitas ligament yang lebih konsisten',
      'Enhanced patellofemoral articulation',
      '+/-2 size compatibility untuk fleksibilitas sizing'
    ],
    specifications: {
      Tipe: 'Total Knee Replacement (Primary TKA)',
      'Femur Sizes': '15 ukuran, termasuk 5 narrow option',
      'Tibia Sizes': '9 ukuran',
      Fixation: 'Cemented'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/mobio-design-rationale-en.pdf',
    sourceLabel: 'Buka brosur MOBIO',
    heroImage: '/images/client/products/arthroplasty/mobio-total-knee.png'
  },
  {
    slug: 'nova-mis-polyaxial-screw-non-fenestrated',
    name: 'NOVA MIS Polyaxial Screw - Non Fenestrated',
    categoryId: 'spine',
    shortDescription:
      'MIS polyaxial screw non-fenestrated untuk prosedur minimally invasive spine surgery.',
    body:
      'Screw ini memberikan fleksibilitas angulasi dengan desain head multi-axial untuk mempermudah pemasangan rod melalui pendekatan minimal invasif.',
    highlights: [
      'Desain polyaxial untuk kemudahan alignment rod',
      'Profil rendah untuk pendekatan MIS',
      'Kompatibel dengan sistem MIS rod'
    ],
    specifications: {
      Tipe: 'MIS Polyaxial Screw - Non Fenestrated',
      Diameter: '5.5 mm, 6.5 mm, 7.0 mm',
      Panjang: '35-50 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/nova-non-fenestrated.png'
  },
  {
    slug: 'nova-mis-polyaxial-screw-fenestrated',
    name: 'NOVA MIS Polyaxial Screw - Fenestrated',
    categoryId: 'spine',
    shortDescription:
      'MIS polyaxial screw fenestrated untuk augmentasi bone cement pada kasus tertentu.',
    body:
      'Varian fenestrated dirancang untuk memungkinkan augmentasi bone cement melalui lubang pada shaft screw, terutama pada kebutuhan stabilitas tambahan.',
    highlights: [
      'Desain fenestrated untuk cement augmentation',
      'Polyaxial head untuk fleksibilitas alignment',
      'Cocok untuk prosedur MIS dengan kebutuhan augmentasi'
    ],
    specifications: {
      Tipe: 'MIS Polyaxial Screw - Fenestrated',
      Diameter: '5.5 mm, 6.5 mm, 7.0 mm',
      Panjang: '35-50 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/nova-fenestrated.png'
  },
  {
    slug: 'nova-pre-bent-rod',
    name: 'NOVA Pre-Bent Rod',
    categoryId: 'spine',
    shortDescription: 'Pre-bent rod untuk prosedur MIS dengan desain pre-contoured.',
    body:
      'Pre-Bent Rod dirancang khusus untuk prosedur MIS agar mempermudah pemasangan tanpa kebutuhan pembentukan ulang intraoperatif.',
    highlights: [
      'Pre-contoured design untuk efisiensi prosedur',
      'Mengurangi kebutuhan bending intraoperatif',
      'Kompatibel dengan sistem MIS polyaxial screw'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '5.5 mm',
      Panjang: '4-19 cm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/nova-pre-bent-rod.png'
  },
  {
    slug: 'reborn-essence-lumbar-polyaxial-screw',
    name: 'ReBorn Essence Lumbar Polyaxial Screw',
    categoryId: 'spine',
    shortDescription:
      'Sekrup pedikel polyaxial untuk stabilisasi posterior lumbar dan torakolumbar.',
    body:
      'Dilengkapi head multi-aksial untuk memudahkan pemasangan rod dan penyesuaian alignment intraoperatif.',
    highlights: [
      'Desain polyaxial untuk fleksibilitas pemasangan rod',
      'Washer design untuk peningkatan stabilitas konstruksi',
      'Dual-threaded untuk mempermudah insersi'
    ],
    specifications: {
      Tipe: 'Polyaxial',
      Diameter: '4.5 mm, 5.5 mm, 6.5 mm',
      Panjang: '45-50 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/lumbar-polyaxial-screw.png'
  },
  {
    slug: 'reborn-essence-lumbar-monoaxial-pedicle-screw',
    name: 'ReBorn Essence Lumbar Monoaxial Pedicle Screw',
    categoryId: 'spine',
    shortDescription:
      'Monoaxial pedicle screw dengan fixed head untuk konstruksi posterior tulang belakang.',
    body:
      'Dirancang untuk kasus yang membutuhkan rigid fixation dan kontrol alignment pada prosedur lumbar.',
    highlights: [
      'Fixed head design untuk stabilitas konstruksi',
      'Optimal untuk koreksi deformitas dan alignment',
      'Thread presisi untuk fiksasi yang kuat'
    ],
    specifications: {
      Tipe: 'Monoaxial',
      Diameter: '5.5 mm, 6.5 mm',
      Panjang: '30-50 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/lumbar-monoaxial-screw.png'
  },
  {
    slug: 'reborn-essence-lumbar-cannulated-screw',
    name: 'ReBorn Essence Lumbar Cannulated Screw',
    categoryId: 'spine',
    shortDescription:
      'Cannulated screw untuk kebutuhan fiksasi posterior dengan dukungan reduksi tambahan.',
    body:
      'Cannulated Screw merupakan varian untuk kebutuhan fiksasi dengan kedalaman lebih besar atau reduksi tambahan pada prosedur multi-level.',
    highlights: [
      'Fixed head untuk kontrol alignment yang stabil',
      'Extended shaft atau tulip untuk kebutuhan reduksi tambahan',
      'Cocok untuk kasus deformity atau multi-level fixation'
    ],
    specifications: {
      Tipe: 'Monoaxial Cannulated Screw',
      Diameter: '5.5 mm, 6.6 mm',
      Panjang: '35-51 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD'
  },
  {
    slug: 'reborn-essence-transverse-link',
    name: 'ReBorn Essence Transverse Link',
    categoryId: 'spine',
    shortDescription:
      'Komponen penghubung transversal untuk meningkatkan stabilitas rotasional konstruksi posterior.',
    body:
      'Transverse Link menghubungkan dua rod secara transversal dan membantu memperkuat rigiditas sistem pada prosedur multi-level fixation.',
    highlights: [
      'Meningkatkan stabilitas rotasional konstruksi',
      'Membantu menjaga alignment bilateral rod',
      'Kompatibel dengan sistem rod standar'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '5.5 mm',
      Panjang: '20 mm, 40 mm, 60 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/lumbar-cross-link.png'
  },
  {
    slug: 'reborn-essence-smooth-rod-lumbar',
    name: 'ReBorn Essence Smooth Rod Lumbar',
    categoryId: 'spine',
    shortDescription: 'Rod tulang belakang untuk stabilisasi segmen lumbar pada prosedur fusi posterior.',
    body:
      'Smooth Rod Lumbar dirancang untuk kompatibel dengan sistem pedicle screw lumbar dan memberikan dukungan struktural pada konstruksi multi-level.',
    highlights: [
      'Permukaan smooth untuk pemasangan presisi',
      'Kompatibel dengan sistem Pedicle Screw Lumbar',
      'Presisi tinggi untuk stabilisasi multi-level'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '5.5 mm',
      Panjang: '10-48 cm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/lumbar-rod.png'
  },
  {
    slug: 'medinaut-plus-system-balloon-kyphoplasty',
    name: 'Medinaut Plus System Balloon Kyphoplasty',
    categoryId: 'spine',
    shortDescription:
      'Balloon kyphoplasty system dengan alat akses tulang 10-gauge dan balon kateter.',
    body:
      'MEDINAUT PLUS SYSTEM terdiri dari bone access tools, cannula, needle 10G, balloon catheter, dan balloon expander syringe untuk prosedur percutaneous vertebral augmentation.',
    highlights: [
      'Alat akses tulang 10-gauge untuk penetrasi presisi',
      'Mendukung kontrol elevasi vertebra secara bertahap',
      'Dirancang untuk prosedur percutaneous vertebral augmentation'
    ],
    specifications: {
      Tipe: 'Balloon Kyphoplasty System',
      'Working Channel': '10 Gauge',
      Kelengkapan: 'Balloon catheter, expander syringe, bone access tools, cannula & needle 10G',
      'Aplikasi Klinis': 'Vertebral compression fracture, osteoporotic fracture, vertebral augmentation'
    },
    manufacturer: 'IMEDICOM CO., LTD.',
    heroImage: '/images/client/products/spine/medinaut-plus-system.png'
  },
  {
    slug: 'mvx-radiopaque-bone-cement',
    name: 'MVX Radiopaque Bone Cement',
    categoryId: 'spine',
    shortDescription:
      'Semen tulang radiopak untuk vertebroplasty, kyphoplasty, dan pedicular screw injection.',
    body:
      'MVX Radiopaque Bone Cement memiliki agen radiopak dan waktu penanganan yang dikembangkan untuk mendukung fase aplikasi pada prosedur augmentasi vertebra.',
    highlights: [
      'Viskositas awal rendah untuk memudahkan pencampuran',
      'Waktu polimerisasi untuk prosedur yang terkontrol',
      'Dapat mengisi dua level vertebra dengan satu dosis'
    ],
    specifications: {
      Indikasi: 'Vertebroplasty, kyphoplasty, pedicular screw injection',
      Kemasan: 'Ampoule monomer steril, powder dalam double pouch steril',
      Penyimpanan: 'Maksimal 25°C, simpan kering dan terlindung dari cahaya',
      Sterilisasi: 'Steril'
    },
    manufacturer: 'IMEDICOM CO., LTD.',
    heroImage: '/images/client/products/spine/mvx-bone-cement.png'
  },
  {
    slug: 'venus-cervical-intervertebral-cage',
    name: 'VENUS Cervical Intervertebral Cage',
    categoryId: 'spine',
    shortDescription:
      'Cervical intervertebral cage untuk prosedur ACDF dengan teknologi komposit Titanium dan PEEK.',
    body:
      'VENUS Cervical Intervertebral Cage dirancang untuk anterior cervical discectomy and fusion dengan kombinasi material Titanium dan PEEK.',
    highlights: [
      'Kombinasi Titanium dan PEEK',
      'Elastic modulus mendekati tulang alami',
      'Porous surface untuk mendukung osteointegrasi'
    ],
    specifications: {
      Material: 'Ti-6Al-4V Titanium Alloy',
      Lebar: '14/15 mm',
      Depth: '12/14 mm',
      Tinggi: '5-11 mm, lordotic angle 5°'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/venus-cervical-cage.png'
  },
  {
    slug: 't-lock-cervical-intervertebral-cage',
    name: 'T-Lock Cervical Intervertebral Cage',
    categoryId: 'spine',
    shortDescription:
      'Standalone cervical cage dengan integrated screw fixation untuk prosedur ACDF.',
    body:
      'T-Lock Cervical Intervertebral Cage dirancang sebagai sistem standalone dengan integrated screw fixation dan desain zero profile.',
    highlights: [
      'Desain zero profile untuk mengurangi risiko iritasi esofagus',
      'Integrated screw/plate cage untuk stabilitas tambahan',
      'One step locking mechanism'
    ],
    specifications: {
      Material: 'Medical grade implant material',
      Lebar: '14/16 mm',
      Depth: '12/14 mm',
      Tinggi: '5-10 mm, lordotic angle 4°'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/t-lock-cervical-cage.png'
  },
  {
    slug: 't-lock-self-tapping-screw',
    name: 'T-Lock Self-Tapping Screw',
    categoryId: 'spine',
    shortDescription:
      'Self-tapping screw untuk standalone cervical cage system.',
    body:
      'Self-Tapping Screw dirancang untuk membentuk ulir secara langsung saat pemasangan tanpa proses tapping terpisah.',
    highlights: [
      'Desain self-tapping tip untuk membentuk ulir langsung pada tulang',
      'Mengurangi langkah operatif dengan menghilangkan proses tapping tambahan',
      'Memberikan kontrol pemasangan yang presisi'
    ],
    specifications: {
      Material: 'Medical grade implant material',
      Diameter: '3.5 mm, 4.0 mm',
      Panjang: '10-18 mm',
      Sterilisasi: 'Steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/t-lock-self-tapping-screw.png'
  },
  {
    slug: 't-lock-self-drilling-screw',
    name: 'T-Lock Self-Drilling Screw',
    categoryId: 'spine',
    shortDescription:
      'Self-drilling screw dengan ujung drill untuk standalone cervical cage system.',
    body:
      'Self-Drilling Screw dirancang agar dapat melakukan penetrasi langsung ke tulang tanpa kebutuhan pre-drilling.',
    highlights: [
      'Desain self-drilling tip untuk penetrasi langsung tanpa pre-drilling',
      'Mengurangi tahapan prosedur operatif',
      'Memberikan stabilitas awal yang baik'
    ],
    specifications: {
      Material: 'Medical grade implant material',
      Diameter: '3.5 mm, 4.0 mm',
      Panjang: '10-18 mm',
      Sterilisasi: 'Steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/t-lock-self-drilling-screw.png'
  },
  {
    slug: 'reborn-essence-peek-lumbar-intervertebral-cage-plif',
    name: 'ReBorn Essence PEEK Lumbar Intervertebral Cage (PLIF)',
    categoryId: 'spine',
    shortDescription:
      'PEEK lumbar intervertebral cage untuk prosedur posterior lumbar interbody fusion.',
    body:
      'PEEK Lumbar Intervertebral Cage (PLIF) dirancang untuk memberikan stabilitas optimal dan mendukung proses fusi tulang yang efektif dengan variasi ukuran klinis.',
    highlights: [
      'Material PEEK dengan radiolucency tinggi',
      'Teeth 1 mm untuk primary stability',
      'Bullet nose design untuk mempermudah impaksi dan penempatan awal cage'
    ],
    specifications: {
      Material: 'PEEK (Polyether Ether Ketone)',
      Panjang: '24 mm',
      Tinggi: '8-14 mm',
      Sterilisasi: 'Steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD'
  },
  {
    slug: 'reborn-essence-anterior-cervical-plate-system',
    name: 'ReBorn Essence Anterior Cervical Plate System',
    categoryId: 'spine',
    shortDescription:
      'Anterior cervical plate untuk stabilitas dan kesesuaian anatomi pada fiksasi servikal anterior.',
    body:
      'Anterior Cervical Plate dirancang dengan profil tipis dan plate pre-contoured untuk mendukung prosedur fiksasi servikal anterior.',
    highlights: [
      'Desain low profile 2 mm',
      'Plate pre-contoured mengikuti anatomi servikal',
      'Berbagai pilihan panjang untuk kebutuhan multi-level'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Panjang: '22, 24, 26, 28, 40, 46, 50, 54, 60, 64, 70, 74, 82 mm',
      Diameter: '16 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/cervical-anterior-plate.png'
  },
  {
    slug: 'reborn-essence-anterior-cervical-screw',
    name: 'ReBorn Essence Anterior Cervical Screw',
    categoryId: 'spine',
    shortDescription:
      'Anterior cervical screw untuk fiksasi pada anterior cervical plating system.',
    body:
      'Anterior Cervical Screw dirancang untuk fiksasi yang stabil dan presisi pada prosedur anterior cervical plating.',
    highlights: [
      'Desain ulir presisi untuk daya cengkeram optimal',
      'Mendukung stabilitas fiksasi servikal anterior',
      'Kompatibel dengan sistem Anterior Cervical Plate'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Panjang: '12 mm, 14 mm, 16 mm, 18 mm',
      Diameter: '3.0 mm, 3.5 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/cervical-anterior-screw.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-multi-axial-screw',
    name: 'ReBorn Essence Posterior Cervical Multi Axial Screw',
    categoryId: 'spine',
    shortDescription:
      'Multi axial cervical screw untuk posterior cervical fixation system.',
    body:
      'Screw multi-axial pada sistem ini dirancang dengan rentang angulasi luas untuk mempermudah implantasi pada area cervical.',
    highlights: [
      'Angulasi hingga 80° cranial-caudal',
      '+/-40° medial-lateral angulation',
      'Self-tapping dan self-drilling design'
    ],
    specifications: {
      Tipe: 'Multi Axial Cervical Screw',
      Diameter: '3.5 mm',
      Panjang: '10-34 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-screw.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-pedicle-long-screw',
    name: 'ReBorn Essence Posterior Cervical Pedicle Long Screw',
    categoryId: 'spine',
    shortDescription:
      'Long screw untuk posterior cervical fixation dengan dukungan fiksasi lebih dalam.',
    body:
      'Varian long screw pada posterior cervical fixation system dirancang untuk kebutuhan stabilisasi multi-level maupun kasus dengan kebutuhan reduksi lebih tinggi.',
    highlights: [
      'Extended length design untuk kebutuhan fiksasi lebih dalam',
      'Mendukung prosedur multi-level fixation',
      'Presisi tinggi untuk kontrol alignment yang lebih baik'
    ],
    specifications: {
      Tipe: 'Pedicle Screw - Long',
      Diameter: '3.5 mm',
      Panjang: '10-34 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD'
  },
  {
    slug: 'reborn-essence-posterior-cervical-universal-link',
    name: 'ReBorn Essence Posterior Cervical Universal Link',
    categoryId: 'spine',
    shortDescription:
      'Universal link untuk menghubungkan dua rod secara transversal pada posterior cervical fixation.',
    body:
      'Universal Link digunakan untuk meningkatkan stabilitas rotasional dan rigiditas konstruksi posterior cervical.',
    highlights: [
      'Meningkatkan stabilitas rotasional sistem',
      'Membantu menjaga alignment bilateral rod',
      'Kompatibel dengan sistem rod cervical'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '3.5 mm',
      Panjang: '40-60 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-universal-link.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-occipital-plate',
    name: 'ReBorn Essence Posterior Cervical Occipital Plate',
    categoryId: 'spine',
    shortDescription:
      'Occipital plate untuk prosedur occipito-cervical fixation.',
    body:
      'Occipital Plate memberikan titik fiksasi pada area oksipital dan dirancang untuk adaptasi terhadap kontur tulang occipital.',
    highlights: [
      'Desain anatomis mengikuti kontur occipital',
      'Multiple screw hole untuk fleksibilitas pemasangan',
      'Mendukung konstruksi occipito-cervical'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Wide: '5.5 mm, 6.5 mm',
      Panjang: '60-80 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-occipital-plate.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-fixation-screw',
    name: 'ReBorn Essence Posterior Cervical Fixation Screw',
    categoryId: 'spine',
    shortDescription:
      'Cervical fixation screw untuk aplikasi occipital plate dan komponen plate fixation.',
    body:
      'Cervical Fixation Screw dirancang sebagai komponen pendukung dalam posterior cervical fixation system.',
    highlights: [
      'Desain presisi untuk fiksasi cervical',
      'Mendukung aplikasi occipito-cervical',
      'Kompatibel dengan sistem posterior cervical'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '4.0 mm',
      Panjang: '6 mm, 8 mm, 10 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-fixation-screw.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-smooth-rod',
    name: 'ReBorn Essence Posterior Cervical Smooth Rod',
    categoryId: 'spine',
    shortDescription:
      'Smooth rod cervical untuk menghubungkan screw dalam posterior cervical fixation.',
    body:
      'Smooth Rod Cervical berfungsi sebagai elemen utama penghubung antar screw dalam sistem posterior cervical fixation.',
    highlights: [
      'Presisi tinggi untuk alignment optimal',
      'Mendukung konstruksi multi-level',
      'Kompatibel dengan multi axial cervical screw'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '3.5 mm',
      Panjang: '10-17 cm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-smooth-rod.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-connect-rod',
    name: 'ReBorn Essence Posterior Cervical Connect Rod',
    categoryId: 'spine',
    shortDescription:
      'Connect rod untuk memperpanjang atau menghubungkan konstruksi rod pada sistem cervical.',
    body:
      'Connect Rod memungkinkan konfigurasi konstruksi rod yang lebih fleksibel pada kasus kompleks atau revisi.',
    highlights: [
      'Mendukung ekstensi konstruksi rod',
      'Meningkatkan fleksibilitas konfigurasi sistem',
      'Kompatibel dengan sistem cervical fixation'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: 'D1 3.5 mm, D2 5.5 mm',
      Panjang: '300 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-connect-rod.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-connection-block',
    name: 'ReBorn Essence Posterior Cervical Connection Block',
    categoryId: 'spine',
    shortDescription:
      'Connection block untuk menyambungkan rod pada posterior cervical fixation system.',
    body:
      'Connection Block digunakan untuk menyambungkan dua rod atau memperluas konstruksi pada kasus multi-level maupun revisi.',
    highlights: [
      'Mendukung koneksi rod-to-rod',
      'Meningkatkan rigiditas dan stabilitas konstruksi',
      'Memungkinkan konfigurasi fleksibel pada kasus kompleks'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '3.5 mm',
      Panjang: '16.5 mm',
      Sterilisasi: 'Non-steril'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-connection-block.png'
  },
  {
    slug: 'clavicle-plate-system-end',
    name: 'Clavicle Plate System (END)',
    categoryId: 'trauma',
    shortDescription:
      'Plate untuk fiksasi fraktur pada bagian lateral atau ujung clavicle.',
    body:
      'Clavicle Lateral End Plate dirancang khusus untuk fiksasi fraktur pada bagian lateral clavicle dan mendukung stabilitas pada fragmen kecil.',
    highlights: [
      'Desain khusus untuk lateral clavicle',
      'Mendukung fiksasi pada fragmen kecil',
      'Variasi hole untuk kebutuhan berbeda'
    ],
    specifications: {
      Tipe: 'Clavicle End Shaft Plate',
      Desain: 'Anatomical plate',
      'Holes, Sides': '4-9 H, Left & Right',
      Aplikasi: 'Fiksasi fraktur lateral clavicle'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/clavicle-plate-end.png'
  },
  {
    slug: 'clavicle-plate-system-mid',
    name: 'Clavicle Plate System (MID)',
    categoryId: 'trauma',
    shortDescription:
      'Plate anatomis untuk fiksasi fraktur pada bagian tengah clavicle.',
    body:
      'Clavicle Mid Shaft Plate mengikuti kontur clavicle dan tersedia dalam varian increased dan decreased untuk menyesuaikan kebutuhan anatomi pasien.',
    highlights: [
      'Desain anatomis mengikuti kontur clavicle',
      'Tersedia pilihan increased dan decreased',
      'Variasi jumlah hole untuk fleksibilitas pemasangan'
    ],
    specifications: {
      Tipe: 'Clavicle Mid Shaft Plate',
      Desain: 'Anatomical plate',
      Varian: 'Increased 8-10 holes, Decreased 6-10 holes',
      Aplikasi: 'Fiksasi fraktur mid clavicle'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/clavicle-plate-mid.png'
  },
  {
    slug: 'clavicle-hook-plate',
    name: 'Clavicle Hook Plate',
    categoryId: 'trauma',
    shortDescription:
      'Hook plate untuk fiksasi fraktur distal clavicle dan cedera AC joint.',
    body:
      'Clavicle Hook Plate menggunakan hook subacromial untuk menambah stabilitas pada fragmen kecil dan mempertahankan posisi clavicle selama penyembuhan.',
    highlights: [
      'Desain hook untuk tambahan stabilitas pada fragmen kecil',
      'Membantu mempertahankan posisi clavicle',
      'Cocok untuk distal fracture dan AC joint injury'
    ],
    specifications: {
      Tipe: 'Clavicle Hook Plate',
      Desain: 'Plate dengan hook subacromial',
      'Hook Height, Hole': '12 / 15 / 18 mm, 6-8 H',
      Aplikasi: 'Fraktur distal clavicle dan AC joint injury'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/clavicle-hook-plate.png'
  },
  {
    slug: 'locking-screw-system',
    name: 'Locking Screw',
    categoryId: 'trauma',
    shortDescription:
      'Locking screw untuk sistem plate dengan konstruksi yang lebih stabil.',
    body:
      'Locking Screw digunakan bersama sistem plate dengan mekanisme penguncian untuk meningkatkan stabilitas, termasuk pada tulang dengan kualitas rendah.',
    highlights: [
      'Mekanisme locking untuk stabilitas maksimal',
      'Mengurangi risiko screw loosening',
      'Cocok untuk tulang osteoporotik'
    ],
    specifications: {
      Tipe: 'Locking Screw',
      Diameter: '2.7 mm / 3.5 mm',
      Panjang: '12, 14-70 mm',
      Varian: 'Standard / Cannulated'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/locking-screw.png'
  },
  {
    slug: 'cortical-screw-system',
    name: 'Cortical Screw',
    categoryId: 'trauma',
    shortDescription:
      'Cortical screw untuk memberikan kompresi antara plate dan tulang.',
    body:
      'Cortical Screw membantu menarik plate menempel ke permukaan tulang sehingga memberikan kompresi dan stabilisasi awal pada sistem fiksasi.',
    highlights: [
      'Memberikan kompresi antara plate dan tulang',
      'Desain ulir untuk cengkeraman kuat pada cortical bone',
      'Membantu stabilisasi awal fiksasi'
    ],
    specifications: {
      Tipe: 'Cortical Screw',
      Diameter: '3.5 mm',
      Panjang: '12, 14-70 mm',
      Material: 'Medical grade implant material'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/cortical-screw.png'
  }
];

export const getCategory = (id: ProductCategory['id']) =>
  productCategories.find((category) => category.id === id);
