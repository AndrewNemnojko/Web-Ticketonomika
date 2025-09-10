import { Reward } from '../shared/models/reward.model';

// Сегодняшняя награда
export const MOCK_TODAY_REWARD: Reward = {
  material: 'amber',
  amount: 18,
  date: new Date(), // можно null для фейковых наград
};

// Доступность коробки
export let MOCK_BOX_AVAILABLE = true;

// История открытых наград
export const MOCK_REWARDS_HISTORY: Reward[] = [
  { material: 'sapphire', amount: 7, date: new Date('2025-09-03') },
  { material: 'amber', amount: 12, date: new Date('2025-09-04') },
  { material: 'ruby', amount: 5, date: new Date('2025-09-05') },
  { material: 'obsidian', amount: 11, date: new Date('2025-09-06') },
  { material: 'amethyst', amount: 19, date: new Date('2025-09-02') }
];

// Функции для работы с моками
export async function getTodayReward(): Promise<Reward> {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_TODAY_REWARD), 100));
}

export async function isBoxAvailable(): Promise<boolean> {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_BOX_AVAILABLE), 50));
}

export async function getRewardsHistory(): Promise<Reward[]> {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_REWARDS_HISTORY), 150));
}
