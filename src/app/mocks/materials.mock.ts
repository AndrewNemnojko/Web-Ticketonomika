import { Material } from "../shared/models/material.model";

export const MOCK_MATERIALS: Material[] = [
  { name: 'sapphire', price: 0.563, description: 'Дорогоцінний камінь синього кольору, цінується в ювелірній справі' },
  { name: 'amber', price: 0.647, description: 'Органічний камінь, часто використовується в амулетах' },
  { name: 'ruby', price: 0.611, description: 'Червоний дорогоцінний камінь, символ пристрасті та енергії' },
  { name: 'obsidian', price: 0.532, description: 'Вулканічне скло, популярне у ремеслах і декорі' },
  { name: 'amethyst', price: 0.594, description: 'Фіолетовий кварц, використовується у прикрасах та магії' },
  { name: 'quartz', price: 0.876, description: 'Прозорий або напівпрозорий кристал, популярний у ремеслах та декорі' },
  { name: 'emerald', price: 0.665, description: 'Зелений дорогоцінний камінь, символ багатства та родючості, застосовується у прикрасах' },
];

export async function getMaterials(): Promise< Material[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(MOCK_MATERIALS), 100),
  );
}