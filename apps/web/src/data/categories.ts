export type ProductCategory = {
  id: string;
  name: string;
  description: string;
};

export const productCategories: ProductCategory[] = [
  {
    id: 'trauma',
    name: 'Trauma & Reconstruction',
    description: 'Plates, screws, and fixation systems for orthopedic trauma and reconstruction.'
  },
  {
    id: 'spine',
    name: 'Spine Solutions',
    description: 'Implants, instruments, and support systems for spinal procedures.'
  },
  {
    id: 'arthroplasty',
    name: 'Arthroplasty',
    description: 'Hip systems and knee replacement solutions for joint reconstruction procedures.'
  },
  {
    id: 'navigation',
    name: 'Surgical Navigation',
    description: '2D and 3D imaging-based operating room navigation devices.'
  }
];
