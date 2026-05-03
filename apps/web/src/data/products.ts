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
      '2D and 3D image-based orthopedic surgical navigation with real-time guidance during procedures.',
    body:
      'NAVI-OR-1 generates instant 3D anatomical models, supports surgical planning, and enables real-time instrument tracking for spine and trauma procedures.',
    highlights: [
      'Optical tracking device with NDI technology',
      'Real-time information on implant position, angle, depth, and trajectory',
      'Multi-modal 2D-2D, 3D-3D, and 2D-3D registration'
    ],
    specifications: {
      Type: 'NAVI-OR-1',
      'Clinical Applications': 'Spine surgery, trauma surgery',
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
      'Cementless femoral stem with size-specific medial curvature for canal matching and long-term stability.',
    body:
      'JUVENO Femoral Stem System is designed for total hip arthroplasty and can be paired with the PRIMO Acetabular System.',
    highlights: [
      'Size-specific medial curvature for optimal canal matching',
      'Strong axial and rotational stability',
      'Coating supports long-term bone ingrowth'
    ],
    specifications: {
      Type: 'Cementless Femoral Stem (Press-fit)',
      'Neck Angle': '127° / 132°',
      'Stem Length': '96-126 mm',
      Application: 'Total Hip Arthroplasty (THA)'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/juveno-design-rationale-en.pdf',
    sourceLabel: 'Open JUVENO brochure',
    heroImage: '/images/client/products/arthroplasty/juveno-femoral-stem.png'
  },
  {
    slug: 'ofit-dual-taper-femoral-stem-system',
    name: 'OFIT Dual-Taper Femoral Stem System',
    categoryId: 'arthroplasty',
    shortDescription:
      'Cementless femoral stem with a dual-taper design for axial and rotational stability.',
    body:
      'OFIT Dual-Taper Femoral Stem System is designed as a cost-effective total hip solution and can be paired with the FUGU Cementless Acetabular Cup System.',
    highlights: [
      'Dual-taper design for optimal stability',
      'Optimized neck geometry to improve range of motion',
      'Reduced distal tip to reduce the risk of thigh pain'
    ],
    specifications: {
      Type: 'Cementless Femoral Stem (Press-fit)',
      Size: '8.5-18',
      'Stem Length': '120-190 mm',
      Application: 'Total Hip Arthroplasty (THA)'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/ofit-dual-taper-femoral-stem.pdf',
    sourceLabel: 'Open OFIT brochure',
    heroImage: '/images/client/products/arthroplasty/ofit-femoral-stem.png'
  },
  {
    slug: 'primo-acetabular-system',
    name: 'PRIMO Acetabular System',
    categoryId: 'arthroplasty',
    shortDescription:
      'Cementless cup with an advanced locking system and bearing options for total hip arthroplasty.',
    body:
      'PRIMO Acetabular System is an acetabular cup system for total hip arthroplasty and is paired with the JUVENO Femoral Stem.',
    highlights: [
      'Advanced locking system',
      'Bearing options for hip reconstruction',
      'Designed to pair with the JUVENO Femoral Stem'
    ],
    specifications: {
      Type: 'Cementless Acetabular Cup System',
      Application: 'Total Hip Arthroplasty (THA)',
      Pairing: 'JUVENO Femoral Stem',
      Brand: 'B-One'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/primo-design-rationale-en.pdf',
    sourceLabel: 'Open PRIMO brochure',
    heroImage: '/images/client/products/arthroplasty/primo-acetabular-cup.png'
  },
  {
    slug: 'fugu-cementless-acetabular-cup-system',
    name: 'FUGU Cementless Acetabular Cup System',
    categoryId: 'arthroplasty',
    shortDescription:
      'Cementless cup with small teeth geometry and a patented locking mechanism for initial stability.',
    body:
      'FUGU Cementless Acetabular Cup System is an acetabular cup system for total hip arthroplasty and is paired with the OFIT Femoral Stem.',
    highlights: [
      'Small teeth geometry for initial stability',
      'Patented locking mechanism',
      'Designed to pair with the OFIT Femoral Stem'
    ],
    specifications: {
      Type: 'Cementless Acetabular Cup System',
      Application: 'Total Hip Arthroplasty (THA)',
      Pairing: 'OFIT Femoral Stem',
      Brand: 'B-One'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/fugu-cementless-acetabular-cup.pdf',
    sourceLabel: 'Open FUGU brochure',
    heroImage: '/images/client/products/arthroplasty/fugu-acetabular-cup.png'
  },
  {
    slug: 'mobio-total-knee-system',
    name: 'MOBIO Total Knee System',
    categoryId: 'arthroplasty',
    shortDescription:
      'Total knee replacement system with a single-radius design and enhanced patellofemoral articulation.',
    body:
      'MOBIO Total Knee System is designed for primary total knee arthroplasty with flexible sizing and narrow femur options.',
    highlights: [
      'Single-radius design for more consistent ligament stability',
      'Enhanced patellofemoral articulation',
      '+/-2 size compatibility for sizing flexibility'
    ],
    specifications: {
      Type: 'Total Knee Replacement (Primary TKA)',
      'Femur Sizes': '15 ukuran, termasuk 5 narrow option',
      'Tibia Sizes': '9 ukuran',
      Fixation: 'Cemented'
    },
    manufacturer: 'B-ONE MEDICAL (BEIJING), CO., LTD.',
    source: '/documents/client/brochures/mobio-design-rationale-en.pdf',
    sourceLabel: 'Open MOBIO brochure',
    heroImage: '/images/client/products/arthroplasty/mobio-total-knee.png'
  },
  {
    slug: 'nova-mis-polyaxial-screw-non-fenestrated',
    name: 'NOVA MIS Polyaxial Screw - Non Fenestrated',
    categoryId: 'spine',
    shortDescription:
      'MIS non-fenestrated polyaxial screw for minimally invasive spine surgery procedures.',
    body:
      'This screw provides angular flexibility with a multi-axial head design to simplify rod placement through a minimally invasive approach.',
    highlights: [
      'Polyaxial design for easier rod alignment',
      'Low profile for MIS approaches',
      'Compatible with MIS rod systems'
    ],
    specifications: {
      Type: 'MIS Polyaxial Screw - Non Fenestrated',
      Diameter: '5.5 mm, 6.5 mm, 7.0 mm',
      Length: '35-50 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/nova-non-fenestrated.png'
  },
  {
    slug: 'nova-mis-polyaxial-screw-fenestrated',
    name: 'NOVA MIS Polyaxial Screw - Fenestrated',
    categoryId: 'spine',
    shortDescription:
      'MIS fenestrated polyaxial screw for bone cement augmentation in selected cases.',
    body:
      'The fenestrated variant is designed to allow bone cement augmentation through openings in the screw shaft, especially when added stability is needed.',
    highlights: [
      'Fenestrated design for cement augmentation',
      'Polyaxial head for alignment flexibility',
      'Suitable for MIS procedures requiring augmentation'
    ],
    specifications: {
      Type: 'MIS Polyaxial Screw - Fenestrated',
      Diameter: '5.5 mm, 6.5 mm, 7.0 mm',
      Length: '35-50 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/nova-fenestrated.png'
  },
  {
    slug: 'nova-pre-bent-rod',
    name: 'NOVA Pre-Bent Rod',
    categoryId: 'spine',
    shortDescription: 'Pre-bent rod for MIS procedures with a pre-contoured design.',
    body:
      'Pre-Bent Rod is specifically designed for MIS procedures to simplify placement without the need for intraoperative reshaping.',
    highlights: [
      'Pre-contoured design for procedural efficiency',
      'Reduces the need for intraoperative bending',
      'Compatible with MIS polyaxial screw systems'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '5.5 mm',
      Length: '4-19 cm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/nova-pre-bent-rod.png'
  },
  {
    slug: 'reborn-essence-lumbar-polyaxial-screw',
    name: 'ReBorn Essence Lumbar Polyaxial Screw',
    categoryId: 'spine',
    shortDescription:
      'Polyaxial pedicle screw for posterior lumbar and thoracolumbar stabilization.',
    body:
      'Equipped with a multi-axial head to facilitate rod placement and intraoperative alignment adjustment.',
    highlights: [
      'Polyaxial design for flexible rod placement',
      'Washer design for increased construct stability',
      'Dual-threaded to ease insertion'
    ],
    specifications: {
      Type: 'Polyaxial',
      Diameter: '4.5 mm, 5.5 mm, 6.5 mm',
      Length: '45-50 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/lumbar-polyaxial-screw.png'
  },
  {
    slug: 'reborn-essence-lumbar-monoaxial-pedicle-screw',
    name: 'ReBorn Essence Lumbar Monoaxial Pedicle Screw',
    categoryId: 'spine',
    shortDescription:
      'Monoaxial pedicle screw with a fixed head for posterior spinal constructs.',
    body:
      'Designed for cases requiring rigid fixation and alignment control in lumbar procedures.',
    highlights: [
      'Fixed head design for construct stability',
      'Ideal for deformity correction and alignment',
      'Precision thread for strong fixation'
    ],
    specifications: {
      Type: 'Monoaxial',
      Diameter: '5.5 mm, 6.5 mm',
      Length: '30-50 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/lumbar-monoaxial-screw.png'
  },
  {
    slug: 'reborn-essence-lumbar-cannulated-screw',
    name: 'ReBorn Essence Lumbar Cannulated Screw',
    categoryId: 'spine',
    shortDescription:
      'Cannulated screw for posterior fixation applications with added reduction support.',
    body:
      'Cannulated Screw is a variant for fixation needs requiring greater depth or additional reduction support in multi-level procedures.',
    highlights: [
      'Fixed head for stable alignment control',
      'Extended shaft or tulip for additional reduction support',
      'Suitable for deformity or multi-level fixation cases'
    ],
    specifications: {
      Type: 'Monoaxial Cannulated Screw',
      Diameter: '5.5 mm, 6.6 mm',
      Length: '35-51 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD'
  },
  {
    slug: 'reborn-essence-transverse-link',
    name: 'ReBorn Essence Transverse Link',
    categoryId: 'spine',
    shortDescription:
      'Transverse connector component that increases rotational stability in posterior constructs.',
    body:
      'Transverse Link connects two rods transversely and helps reinforce system rigidity in multi-level fixation procedures.',
    highlights: [
      'Increases construct rotational stability',
      'Helps maintain bilateral rod alignment',
      'Compatible with standard rod systems'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '5.5 mm',
      Length: '20 mm, 40 mm, 60 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/lumbar-cross-link.png'
  },
  {
    slug: 'reborn-essence-smooth-rod-lumbar',
    name: 'ReBorn Essence Smooth Rod Lumbar',
    categoryId: 'spine',
    shortDescription: 'Spinal rod for lumbar segment stabilization in posterior fusion procedures.',
    body:
      'Smooth Rod Lumbar is designed to be compatible with lumbar pedicle screw systems and provide structural support in multi-level constructs.',
    highlights: [
      'Smooth surface for precise placement',
      'Compatible with Lumbar Pedicle Screw systems',
      'High precision for multi-level stabilization'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '5.5 mm',
      Length: '10-48 cm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/lumbar-rod.png'
  },
  {
    slug: 'medinaut-plus-system-balloon-kyphoplasty',
    name: 'Medinaut Plus System Balloon Kyphoplasty',
    categoryId: 'spine',
    shortDescription:
      'Balloon kyphoplasty system with 10-gauge bone access instruments and a balloon catheter.',
    body:
      'MEDINAUT PLUS SYSTEM consists of bone access tools, a cannula, a 10G needle, a balloon catheter, and a balloon expander syringe for percutaneous vertebral augmentation procedures.',
    highlights: [
      '10-gauge bone access instrument for precise penetration',
      'Supports gradual control of vertebral height restoration',
      'Designed for percutaneous vertebral augmentation procedures'
    ],
    specifications: {
      Type: 'Balloon Kyphoplasty System',
      'Working Channel': '10 Gauge',
      Contents: 'Balloon catheter, expander syringe, bone access tools, cannula & needle 10G',
      'Clinical Applications': 'Vertebral compression fracture, osteoporotic fracture, vertebral augmentation'
    },
    manufacturer: 'IMEDICOM CO., LTD.',
    heroImage: '/images/client/products/spine/medinaut-plus-system.png'
  },
  {
    slug: 'mvx-radiopaque-bone-cement',
    name: 'MVX Radiopaque Bone Cement',
    categoryId: 'spine',
    shortDescription:
      'Radiopaque bone cement for vertebroplasty, kyphoplasty, and pedicular screw injection.',
    body:
      'MVX Radiopaque Bone Cement contains a radiopaque agent and handling time developed to support the application phase in vertebral augmentation procedures.',
    highlights: [
      'Low initial viscosity for easier mixing',
      'Polymerization time for controlled procedures',
      'Can fill two vertebral levels with one dose'
    ],
    specifications: {
      Indications: 'Vertebroplasty, kyphoplasty, pedicular screw injection',
      Packaging: 'Sterile monomer ampoule, powder in a double sterile pouch',
      Storage: 'Maximum 25°C, store dry and protected from light',
      Sterilization: 'Sterile'
    },
    manufacturer: 'IMEDICOM CO., LTD.',
    heroImage: '/images/client/products/spine/mvx-bone-cement.png'
  },
  {
    slug: 'venus-cervical-intervertebral-cage',
    name: 'VENUS Cervical Intervertebral Cage',
    categoryId: 'spine',
    shortDescription:
      'Cervical intervertebral cage for ACDF procedures with Titanium and PEEK composite technology.',
    body:
      'VENUS Cervical Intervertebral Cage is designed for anterior cervical discectomy and fusion using a combination of Titanium and PEEK materials.',
    highlights: [
      'Combination of Titanium and PEEK',
      'Elastic modulus close to natural bone',
      'Porous surface to support osseointegration'
    ],
    specifications: {
      Material: 'Ti-6Al-4V Titanium Alloy',
      Width: '14/15 mm',
      Depth: '12/14 mm',
      Height: '5-11 mm, lordotic angle 5°'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/venus-cervical-cage.png'
  },
  {
    slug: 't-lock-cervical-intervertebral-cage',
    name: 'T-Lock Cervical Intervertebral Cage',
    categoryId: 'spine',
    shortDescription:
      'Standalone cervical cage with integrated screw fixation for ACDF procedures.',
    body:
      'T-Lock Cervical Intervertebral Cage is designed as a standalone system with integrated screw fixation and a zero-profile design.',
    highlights: [
      'Zero-profile design to reduce the risk of esophageal irritation',
      'Integrated screw/plate cage for added stability',
      'One step locking mechanism'
    ],
    specifications: {
      Material: 'Medical grade implant material',
      Width: '14/16 mm',
      Depth: '12/14 mm',
      Height: '5-10 mm, lordotic angle 4°'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/t-lock-cervical-cage.png'
  },
  {
    slug: 't-lock-self-tapping-screw',
    name: 'T-Lock Self-Tapping Screw',
    categoryId: 'spine',
    shortDescription:
      'Self-tapping screw for standalone cervical cage systems.',
    body:
      'Self-Tapping Screw is designed to form threads directly during insertion without a separate tapping process.',
    highlights: [
      'Self-tapping tip design to create threads directly in bone',
      'Reduces operative steps by eliminating additional tapping',
      'Provides precise insertion control'
    ],
    specifications: {
      Material: 'Medical grade implant material',
      Diameter: '3.5 mm, 4.0 mm',
      Length: '10-18 mm',
      Sterilization: 'Sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/t-lock-self-tapping-screw.png'
  },
  {
    slug: 't-lock-self-drilling-screw',
    name: 'T-Lock Self-Drilling Screw',
    categoryId: 'spine',
    shortDescription:
      'Self-drilling screw with a drill-tip for standalone cervical cage systems.',
    body:
      'Self-Drilling Screw is designed to penetrate bone directly without the need for pre-drilling.',
    highlights: [
      'Self-drilling tip design for direct penetration without pre-drilling',
      'Reduces procedural steps',
      'Provides strong initial stability'
    ],
    specifications: {
      Material: 'Medical grade implant material',
      Diameter: '3.5 mm, 4.0 mm',
      Length: '10-18 mm',
      Sterilization: 'Sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/t-lock-self-drilling-screw.png'
  },
  {
    slug: 'reborn-essence-peek-lumbar-intervertebral-cage-plif',
    name: 'ReBorn Essence PEEK Lumbar Intervertebral Cage (PLIF)',
    categoryId: 'spine',
    shortDescription:
      'PEEK lumbar intervertebral cage for posterior lumbar interbody fusion procedures.',
    body:
      'PEEK Lumbar Intervertebral Cage (PLIF) is designed to provide optimal stability and support effective bone fusion across a range of clinical sizes.',
    highlights: [
      'PEEK material with high radiolucency',
      '1 mm teeth for primary stability',
      'Bullet nose design to facilitate impaction and initial cage placement'
    ],
    specifications: {
      Material: 'PEEK (Polyether Ether Ketone)',
      Length: '24 mm',
      Height: '8-14 mm',
      Sterilization: 'Sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD'
  },
  {
    slug: 'reborn-essence-anterior-cervical-plate-system',
    name: 'ReBorn Essence Anterior Cervical Plate System',
    categoryId: 'spine',
    shortDescription:
      'Anterior cervical plate for stability and anatomical conformity in anterior cervical fixation.',
    body:
      'Anterior Cervical Plate is designed with a thin profile and a pre-contoured plate to support anterior cervical fixation procedures.',
    highlights: [
      'Desain low profile 2 mm',
      'Pre-contoured plate that follows cervical anatomy',
      'Multiple length options for multi-level needs'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Length: '22, 24, 26, 28, 40, 46, 50, 54, 60, 64, 70, 74, 82 mm',
      Diameter: '16 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/cervical-anterior-plate.png'
  },
  {
    slug: 'reborn-essence-anterior-cervical-screw',
    name: 'ReBorn Essence Anterior Cervical Screw',
    categoryId: 'spine',
    shortDescription:
      'Anterior cervical screw for fixation in anterior cervical plating systems.',
    body:
      'Anterior Cervical Screw is designed for stable and precise fixation in anterior cervical plating procedures.',
    highlights: [
      'Precision thread design for optimal grip',
      'Supports stable anterior cervical fixation',
      'Compatible with the Anterior Cervical Plate system'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Length: '12 mm, 14 mm, 16 mm, 18 mm',
      Diameter: '3.0 mm, 3.5 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/cervical-anterior-screw.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-multi-axial-screw',
    name: 'ReBorn Essence Posterior Cervical Multi Axial Screw',
    categoryId: 'spine',
    shortDescription:
      'Multi-axial cervical screw for posterior cervical fixation systems.',
    body:
      "This system's multi-axial screw is designed with a wide angulation range to simplify implantation in the cervical region.",
    highlights: [
      'Up to 80° cranial-caudal angulation',
      '+/-40° medial-lateral angulation',
      'Self-tapping and self-drilling design'
    ],
    specifications: {
      Type: 'Multi Axial Cervical Screw',
      Diameter: '3.5 mm',
      Length: '10-34 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-screw.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-pedicle-long-screw',
    name: 'ReBorn Essence Posterior Cervical Pedicle Long Screw',
    categoryId: 'spine',
    shortDescription:
      'Long screw for posterior cervical fixation with deeper fixation support.',
    body:
      'The long screw variant in the posterior cervical fixation system is designed for multi-level stabilization needs and cases requiring greater reduction.',
    highlights: [
      'Extended length design for deeper fixation needs',
      'Supports multi-level fixation procedures',
      'High precision for improved alignment control'
    ],
    specifications: {
      Type: 'Pedicle Screw - Long',
      Diameter: '3.5 mm',
      Length: '10-34 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD'
  },
  {
    slug: 'reborn-essence-posterior-cervical-universal-link',
    name: 'ReBorn Essence Posterior Cervical Universal Link',
    categoryId: 'spine',
    shortDescription:
      'Universal link for transversely connecting two rods in posterior cervical fixation.',
    body:
      'Universal Link is used to increase rotational stability and rigidity in posterior cervical constructs.',
    highlights: [
      'Increases system rotational stability',
      'Helps maintain bilateral rod alignment',
      'Compatible with cervical rod systems'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '3.5 mm',
      Length: '40-60 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-universal-link.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-occipital-plate',
    name: 'ReBorn Essence Posterior Cervical Occipital Plate',
    categoryId: 'spine',
    shortDescription:
      'Occipital plate for occipito-cervical fixation procedures.',
    body:
      'Occipital Plate provides a fixation point in the occipital region and is designed to adapt to the contour of the occipital bone.',
    highlights: [
      'Anatomical design that follows the occipital contour',
      'Multiple screw holes for placement flexibility',
      'Supports occipito-cervical constructs'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Wide: '5.5 mm, 6.5 mm',
      Length: '60-80 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-occipital-plate.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-fixation-screw',
    name: 'ReBorn Essence Posterior Cervical Fixation Screw',
    categoryId: 'spine',
    shortDescription:
      'Cervical fixation screw for occipital plate applications and plate fixation components.',
    body:
      'Cervical Fixation Screw is designed as a supporting component within the posterior cervical fixation system.',
    highlights: [
      'Precision design for cervical fixation',
      'Supports occipito-cervical applications',
      'Compatible with posterior cervical systems'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '4.0 mm',
      Length: '6 mm, 8 mm, 10 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-fixation-screw.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-smooth-rod',
    name: 'ReBorn Essence Posterior Cervical Smooth Rod',
    categoryId: 'spine',
    shortDescription:
      'Smooth cervical rod for connecting screws in posterior cervical fixation.',
    body:
      'Smooth Rod Cervical functions as the primary connecting element between screws in the posterior cervical fixation system.',
    highlights: [
      'High precision for optimal alignment',
      'Supports multi-level constructs',
      'Compatible with multi-axial cervical screws'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '3.5 mm',
      Length: '10-17 cm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-smooth-rod.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-connect-rod',
    name: 'ReBorn Essence Posterior Cervical Connect Rod',
    categoryId: 'spine',
    shortDescription:
      'Connect rod for extending or connecting rod constructs in cervical systems.',
    body:
      'Connect Rod enables more flexible rod construct configurations in complex or revision cases.',
    highlights: [
      'Supports rod construct extension',
      'Increases system configuration flexibility',
      'Compatible with cervical fixation systems'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: 'D1 3.5 mm, D2 5.5 mm',
      Length: '300 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-connect-rod.png'
  },
  {
    slug: 'reborn-essence-posterior-cervical-connection-block',
    name: 'ReBorn Essence Posterior Cervical Connection Block',
    categoryId: 'spine',
    shortDescription:
      'Connection block for linking rods in posterior cervical fixation systems.',
    body:
      'Connection Block is used to connect two rods or extend the construct in multi-level or revision cases.',
    highlights: [
      'Mendukung koneksi rod-to-rod',
      'Increases construct rigidity and stability',
      'Enables flexible configurations in complex cases'
    ],
    specifications: {
      Material: 'Medical grade alloy',
      Diameter: '3.5 mm',
      Length: '16.5 mm',
      Sterilization: 'Non-sterile'
    },
    manufacturer: 'BAUI BIOTECH CO., LTD',
    heroImage: '/images/client/products/spine/posterior-cervical-connection-block.png'
  },
  {
    slug: 'clavicle-plate-system-end',
    name: 'Clavicle Plate System (END)',
    categoryId: 'trauma',
    shortDescription:
      'Plate for fracture fixation at the lateral or distal end of the clavicle.',
    body:
      'Clavicle Lateral End Plate is designed specifically for fracture fixation at the lateral clavicle and supports stability in small fragments.',
    highlights: [
      'Specialized design for the lateral clavicle',
      'Supports fixation in small fragments',
      'Hole variations for different needs'
    ],
    specifications: {
      Type: 'Clavicle End Shaft Plate',
      Design: 'Anatomical plate',
      'Holes, Sides': '4-9 H, Left & Right',
      Application: 'Lateral clavicle fracture fixation'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/clavicle-plate-end.png'
  },
  {
    slug: 'clavicle-plate-system-mid',
    name: 'Clavicle Plate System (MID)',
    categoryId: 'trauma',
    shortDescription:
      'Anatomical plate for fracture fixation in the midshaft clavicle.',
    body:
      'Clavicle Mid Shaft Plate follows the clavicle contour and is available in increased and decreased variants to suit patient anatomy.',
    highlights: [
      'Anatomical design following the clavicle contour',
      'Available in increased and decreased options',
      'Variation in hole counts for placement flexibility'
    ],
    specifications: {
      Type: 'Clavicle Mid Shaft Plate',
      Design: 'Anatomical plate',
      Variants: 'Increased 8-10 holes, Decreased 6-10 holes',
      Application: 'Mid-clavicle fracture fixation'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/clavicle-plate-mid.png'
  },
  {
    slug: 'clavicle-hook-plate',
    name: 'Clavicle Hook Plate',
    categoryId: 'trauma',
    shortDescription:
      'Hook plate for distal clavicle fracture fixation and AC joint injuries.',
    body:
      'Clavicle Hook Plate uses a subacromial hook to add stability to small fragments and maintain clavicle position during healing.',
    highlights: [
      'Hook design for added stability in small fragments',
      'Helps maintain clavicle position',
      'Suitable for distal fractures and AC joint injuries'
    ],
    specifications: {
      Type: 'Clavicle Hook Plate',
      Design: 'Plate with subacromial hook',
      'Hook Height, Hole': '12 / 15 / 18 mm, 6-8 H',
      Application: 'Distal clavicle fractures and AC joint injuries'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/clavicle-hook-plate.png'
  },
  {
    slug: 'locking-screw-system',
    name: 'Locking Screw',
    categoryId: 'trauma',
    shortDescription:
      'Locking screw for plate systems with more stable constructs.',
    body:
      'Locking Screw is used with plate systems through a locking mechanism to increase stability, including in bone with lower quality.',
    highlights: [
      'Locking mechanism for maximum stability',
      'Reduces the risk of screw loosening',
      'Suitable for osteoporotic bone'
    ],
    specifications: {
      Type: 'Locking Screw',
      Diameter: '2.7 mm / 3.5 mm',
      Length: '12, 14-70 mm',
      Variants: 'Standard / Cannulated'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/locking-screw.png'
  },
  {
    slug: 'cortical-screw-system',
    name: 'Cortical Screw',
    categoryId: 'trauma',
    shortDescription:
      'Cortical screw for compressing the plate against bone.',
    body:
      'Cortical Screw helps draw the plate toward the bone surface to provide compression and initial stabilization in fixation systems.',
    highlights: [
      'Provides compression between plate and bone',
      'Thread design for strong grip in cortical bone',
      'Supports initial fixation stabilization'
    ],
    specifications: {
      Type: 'Cortical Screw',
      Diameter: '3.5 mm',
      Length: '12, 14-70 mm',
      Material: 'Medical grade implant material'
    },
    manufacturer: 'BY ONE',
    heroImage: '/images/client/products/trauma/cortical-screw.png'
  }
];

export const getCategory = (id: ProductCategory['id']) =>
  productCategories.find((category) => category.id === id);
