import { User } from '../shared/models/user.model';

export const USER_MOCK: User = {
  id: '534523435',
  username: '@MishKa2436',
  name: '🍉✙Український Горішок ꑭ△🇺🇦',
  avatar: 'https://cdn4.telesco.pe/file/WEA3RaqmOjfLjWY-_NQJLJ0a2GDDGBGx61CLFwQf6JfOSWP_nJ5nRpVhS5twAIRTGvgrR4z2W5puV3oF22YzHm0Kq-BGkMVHl0V-__8T8tNtL4r3RVUVyVLqzZhbmCsa3iME7evzycDfAQys07dKnRw3UYNQVY32d-IplNAVplS83zgJWHgx6HFT9bAjD85yIe359uu-4xyfJOYtkLWjet9kBAZnjllpix06n3WcEJplSTgUBY8NoQGtbyZ0Qozf56FgoHwGzhL0w5jS7V5jYX18zNEuHeJOqojoiXu9vsYkBMaP5Olts_CxLvO0J-zLAo7oMdOAoW8C_VKbg4F0kg.jpg',
  tickets: 1323,
  passportId: '04G1',
  legalStatus: 'Citizen',
  materials: [
    { name: 'sapphire', amount: 424, price: 0.563 },
    { name: 'emerald', amount: 171, price: 0.665 },
    { name: 'ruby', amount: 192, price: 0.611 },
    { name: 'quartz', amount: 191, price: 0.876 },
    { name: 'obsidian', amount: 148, price: 0.532 },
    { name: 'amethyst', amount: 193, price: 0.594 },
    { name: 'amber', amount: 660, price: 0.647 },
  ],
  awards: [
    {
      id: 1,
      name: '🛡️ [DF-L3] Орден Захисника Спільноти «Знищувач Маліків»',
      issuance: new Date(),
      description: 'Орден Захисника Спільноти',
    },
    {
      id: 2,
      name: '🎨 [CU-L3] Созидатель 2D-тянок',
      issuance: new Date(),
      description: 'Созидатель 2D-тянок',
    },
    {
      id: 3,
      name: '🤝 [SO-L3] Відзнака Переговорника Колегії',
      issuance: new Date(),
      description: 'Переговорник Колегії',
    },
    {
      id: 4,
      name: '⚙️ [SO-L3] Відзнака «Розробник Парламенту»',
      issuance: new Date(),
      description: 'Розробник Парламенту',
    },
    {
      id: 5,
      name: '🎵 [CU-L3] Премія «Октава»',
      issuance: new Date(),
      description: 'Премія Октава',
    },
    {
      id: 6,
      name: '⚔️ [CU-L3] Премія «Орфей Спільноти»',
      issuance: new Date(),
      description: 'Премія Орфей Спільноти',
    },
  ],
  jobs: [
    { id: 1, name: 'Kanzler', salary: 0, description: '' },
    { id: 2, name: 'Party Leader', salary: 0, description: '' },
    { id: 3, name: 'Parliamentarian', salary: 0, description: '' },
  ],
};
