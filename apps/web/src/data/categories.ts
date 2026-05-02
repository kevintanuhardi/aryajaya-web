export type ProductCategory = {
  id: string;
  name: string;
  description: string;
};

export const productCategories: ProductCategory[] = [
  {
    id: 'trauma',
    name: 'Trauma & Reconstruction',
    description: 'Plate, screw, dan sistem fiksasi untuk trauma ortopedi dan rekonstruksi.'
  },
  {
    id: 'spine',
    name: 'Spine Solutions',
    description: 'Implan, instrumen, dan sistem pendukung untuk prosedur tulang belakang.'
  },
  {
    id: 'arthroplasty',
    name: 'Arthroplasty',
    description: 'Sistem hip dan knee replacement untuk prosedur rekonstruksi sendi.'
  },
  {
    id: 'navigation',
    name: 'Surgical Navigation',
    description: 'Perangkat navigasi ruang operasi berbasis pencitraan 2D dan 3D.'
  }
];
