import { User } from '../shared/models/user.model';

export const USER_MOCK: User = {
  id: '534523435',
  username: '@MishKa2436',
  name: '🍉✙Український Горішок ꑭ△🇺🇦',
  avatar:
    'https://cdn4.telesco.pe/file/WEA3RaqmOjfLjWY-_NQJLJ0a2GDDGBGx61CLFwQf6JfOSWP_nJ5nRpVhS5twAIRTGvgrR4z2W5puV3oF22YzHm0Kq-BGkMVHl0V-__8T8tNtL4r3RVUVyVLqzZhbmCsa3iME7evzycDfAQys07dKnRw3UYNQVY32d-IplNAVplS83zgJWHgx6HFT9bAjD85yIe359uu-4xyfJOYtkLWjet9kBAZnjllpix06n3WcEJplSTgUBY8NoQGtbyZ0Qozf56FgoHwGzhL0w5jS7V5jYX18zNEuHeJOqojoiXu9vsYkBMaP5Olts_CxLvO0J-zLAo7oMdOAoW8C_VKbg4F0kg.jpg',
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
    issuance: new Date('2025-03-27T17:56:13'),
    description: `Вніч на 22 березня 2025 року наша Спільнота зазнала нападу, відомий як «Рейд Маліка». 
    Сили Оборони дали рішучу відсіч і завдали нищівного удару у відповідь. 
    Ця нагорода засвідчує активну участь у захисті Спільноти. Слава Рутеру!`,
  },
  {
    id: 2,
    name: '🎨 [CU-L3] Созидатель 2D-тянок',
    issuance: new Date('2025-04-05T18:21:18'),
    description: `Відзначається за вагомий внесок у розвиток та становлення 2D-світу маня. 
    Адміністрація високо цінує вашу відданість аніме та двовимірній естетиці. 
    Вашу роботу закарбовано в історії Спільноти. Слава Рутеру!`,
  },
  {
    id: 3,
    name: '🤝 [SO-L3] Відзнака Переговорника Колегії',
    issuance: new Date('2025-04-07T00:54:48'),
    description: `Нагорода за взірцеве виконання дипломатичної місії у складі переговорної групи Колегії. 
    Визнання вашої мудрості, виваженості та непохитної відданості принципам обмеженої демократії. 
    Майбутня бюрократія буде вчитися на вашій майстерності. Слава Спільноті!`,
  },
  {
    id: 4,
    name: '⚙️ [SO-L3] Відзнака «Розробник Парламенту»',
    issuance: new Date('2025-04-12T23:34:57'),
    description: `Нагорода за активну участь у розробці парламенту. 
    Ваш внесок у довгий і кропіткий процес реалізації демократичних інституцій для Тікетономіки неоціненний. Слава Спільноті!`,
  },
  {
    id: 5,
    name: '🎵 [CU-L3] Премія «Октава»',
    issuance: new Date('2025-04-13T16:21:44'),
    description: `Нагорода за значний внесок у розвиток музики в Спільноті. 
    Адміністрація вдячна за ваш культурний внесок. Слава Спільноті!`,
  },
  {
    id: 6,
    name: '⚔️ [CU-L3] Премія «Орфей Спільноти»',
    issuance: new Date('2025-04-13T16:22:42'),
    description: `Нагорода за надзвичайно вагомий внесок у розвиток музичної культури та Лор Спільноти. 
    Орфей — легендарний музикант античності, символ музичної традиції. 
    Ця премія вшановує ваші композиторські здібності та геній. Слава Спільноті!`,
  },
]
,
  jobs: [
    { id: 1, name: 'Kanzler', salary: 0, description: '' },
    { id: 2, name: 'Party Leader', salary: 0, description: '' },
    { id: 3, name: 'Parliamentarian', salary: 0, description: '' },
  ],
};
