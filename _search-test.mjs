import Fuse from 'fuse.js';
const places = [
  { slug: 'fushimi-inari', nameEn: 'Fushimi Inari', nameRu: 'Фусими Инари', city: 'kyoto', tags: ['temple-shrine','morning','walk','view'], description: 'Тысячи красных тории.' },
  { slug: 'arashiyama', nameEn: 'Arashiyama', nameRu: 'Арасияма', city: 'kyoto', tags: ['morning'], description: 'Бамбук' },
  { slug: 'nara', nameEn: 'Nara', nameRu: 'Нара', city: 'osaka', tags: ['day-trip'], description: 'Олени' },
];
const fuse = new Fuse(places, {
  keys: [
    { name: 'nameRu', weight: 3 },
    { name: 'nameEn', weight: 3 },
    { name: 'tags', weight: 1 },
    { name: 'city', weight: 1 },
    { name: 'description', weight: 1 },
  ],
  threshold: 0.35, ignoreLocation: true, minMatchCharLength: 2,
});
for (const q of ['инари','inari','fushimi','фусими']) {
  const top = fuse.search(q)[0];
  console.log(q, '->', top ? top.item.slug : 'NO MATCH');
}
