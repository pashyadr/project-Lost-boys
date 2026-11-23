// DATA CONTOH (sintetis) untuk prototipe UI.
// Nanti diganti data asli dari SQLite lokal / backend Spring Boot.

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?w=${w}&q=70`;

export const user = {
  name: 'Rani',
  goal: 'Turun berat badan',
  streakDays: 12,
};

export const calories = { eaten: 1240, target: 1900, burned: 180 };

export type Macro = {
  id: string;
  label: string;
  unit: string;
  eaten: number;
  target: number;
  /** batas atas: melewati target = peringatan, bukan pencapaian */
  isLimit?: boolean;
  hint: string;
};

export const macros: Macro[] = [
  { id: 'protein', label: 'Protein', unit: 'g', eaten: 58, target: 95, hint: 'Tambah telur atau tempe' },
  { id: 'karbo', label: 'Karbo', unit: 'g', eaten: 142, target: 220, hint: 'Pilih nasi merah' },
  { id: 'lemak', label: 'Lemak', unit: 'g', eaten: 38, target: 55, hint: 'Aman, pertahankan' },
  { id: 'serat', label: 'Serat', unit: 'g', eaten: 14, target: 28, hint: 'Sayur di makan malam' },
  { id: 'gula', label: 'Gula', unit: 'g', eaten: 31, target: 25, isLimit: true, hint: 'Lewat batas, stop minuman manis' },
];

/** 7 hari terakhir, hari ini paling kanan. */
export const week = [
  { day: 'Sel', done: true },
  { day: 'Rab', done: true },
  { day: 'Kam', done: true },
  { day: 'Jum', done: true },
  { day: 'Sab', done: true },
  { day: 'Min', done: true },
  { day: 'Sen', done: false, today: true },
];

export const water = { glasses: 5, target: 8 };

export const nextMeal = {
  slot: 'Makan siang',
  time: '12.30',
  inMinutes: 45,
  menu: 'Nasi merah, dada ayam bakar, tumis buncis',
  kcal: 560,
  protein: 38,
  image: img('photo-1532550907401-a500c9a57435'),
};

export type AdviceKind = 'kurangi' | 'ganti' | 'tambah';

export type Advice = {
  id: string;
  kind: AdviceKind;
  title: string;
  why: string;
  image: string;
};

export const advice: Advice[] = [
  {
    id: 'a1',
    kind: 'ganti',
    title: 'Nasi putih → nasi merah',
    why: 'Indeks glikemik lebih rendah: gula darah naik pelan, kenyang lebih lama.',
    image: img('photo-1546069901-ba9599a7e63c', 400),
  },
  {
    id: 'a2',
    kind: 'kurangi',
    title: 'Teh manis kemasan',
    why: 'Gula tambahanmu 31 g, sudah lewat batas 25 g. Ganti air putih atau teh tawar.',
    image: img('photo-1540189549336-e6e99c3679fe', 400),
  },
  {
    id: 'a3',
    kind: 'tambah',
    title: 'Sayur di makan malam',
    why: 'Serat baru 14 dari 28 g. Semangkuk bayam menambah ±4 g.',
    image: img('photo-1512621776951-a57141f2eefd', 400),
  },
];

export const heroImage = img('photo-1517836357463-d25dfeac3438', 1200);

export const move = {
  minutes: 30,
  title: 'Jalan cepat atau push-up ringan',
  detail: 'Membakar ±150 kkal dan membantu gula darah setelah makan siang.',
  image: img('photo-1594737625785-a6cbdabd333c'),
};
