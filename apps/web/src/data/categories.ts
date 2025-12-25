export type ProductCategory = {
  id: string;
  name: string;
  description: string;
};

export const productCategories: ProductCategory[] = [
  {
    id: 'spine',
    name: 'Spine Solutions',
    description: 'Implan dan instrumen untuk prosedur tulang belakang minimal invasif.'
  },
  {
    id: 'orthopedic',
    name: 'Orthopedic Trauma',
    description: 'Sistem fiksasi tulang untuk trauma ekstremitas dan rekonstruksi sendi.'
  },
  {
    id: 'navigation',
    name: 'Navigation & Robotics',
    description: 'Perangkat pandu navigasi ruang operasi untuk presisi pembedahan.'
  }
];
