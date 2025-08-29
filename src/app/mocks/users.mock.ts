import { User } from "../shared/models/user.model";

export const USER_MOCK: User = {
  id: '534523435',
  username: '@capri_xj',
  name: 'anton kolot',
  avatar: 'https://telegram.im/img/capri_xj',
  tickets: 1240,
  passportId: '07G1',
  legalStatus: 'Citizen',
  materials: [
    { name: 'sapphire', amount: 210, price: 3, emoji: '' },
    { name: 'emerald', amount: 105, price: 2, emoji: '' },
    { name: 'ruby', amount: 75, price: 4, emoji: '' },
    { name: 'quartz', amount: 88, price: 4, emoji: '' },
    { name: 'obsidian', amount: 43, price: 5, emoji: '' },
    { name: 'amethyst', amount: 125, price: 2, emoji: '' }
  ],
  awards: [
    { id: 1, name: '🎖 [DF-L3] Орден Захисника Спільноти «Знищувач Маліків»', issuance: new Date(), description: 'Орден Захисника Спільноти' },
    { id: 2, name: '🎖 [CU-L3] Созидатель 2D-тянок', issuance: new Date(), description: 'Созидатель 2D-тянок' },
    { id: 3, name: '🎖 [SO-L3] Відзнака Переговорника Колегії', issuance: new Date(), description: 'Переговорник Колегії' },
    { id: 4, name: '🎖 [SO-L3] Відзнака «Розробник Парламенту»', issuance: new Date(), description: 'Розробник Парламенту' },
    { id: 5, name: '🎖 [CU-L3] Премія «Октава»', issuance: new Date(), description: 'Премія Октава' },
    { id: 6, name: '🎖 [CU-L3] Премія «Орфей Спільноти»', issuance: new Date(), description: 'Премія Орфей Спільноти' },
  ],
  jobs: [
    { id: 1, name: 'Kanzler', salary: 0, description: '' },
    { id: 2, name: 'Party Leader', salary: 0, description: '' },
    { id: 3, name: 'Parliamentarian', salary: 0, description: '' },
  ]
};

