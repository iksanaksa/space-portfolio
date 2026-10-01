export interface PlanetConfig {
  id: string
  name: string
  // visual
  colorA: string
  colorB: string
  colorC: string
  radius: number
  distance: number
  speed: number
  spinSpeed: number
  seed: number
  // konten project
  year: string
  role: string
  duration: string
  summary: string
  stack: string[]
}

export const planets: PlanetConfig[] = [
  {
    id: 'alpha',
    name: 'Alpha',
    colorA: '#0a2a4a',
    colorB: '#4a90e2',
    colorC: '#cfe4ff',
    radius: 0.35,
    distance: 3.0,
    speed: 0.35,
    spinSpeed: 0.6,
    seed: 12.3,
    year: '2025',
    role: 'Frontend & UI',
    duration: '6 minggu',
    summary:
      'Aplikasi kasir untuk UMKM yang butuh cepat, offline-first, dan tidak bikin pusing. Fokus di satu hal — transaksi 3 detik selesai.',
    stack: ['React', 'Vite', 'Zustand', 'IndexedDB', 'Tailwind'],
  },
  {
    id: 'beta',
    name: 'Beta',
    colorA: '#3d1f14',
    colorB: '#e07a5f',
    colorC: '#ffd9b3',
    radius: 0.42,
    distance: 4.2,
    speed: 0.22,
    spinSpeed: 0.5,
    seed: 47.8,
    year: '2024',
    role: 'Fullstack',
    duration: '4 bulan',
    summary:
      'Platform belajar bahasa dengan pendekatan spaced-repetition yang tidak berasa seperti PR sekolah. Fokus di retensi jangka panjang.',
    stack: ['Next.js', 'Postgres', 'Prisma', 'Radix UI'],
  },
  {
    id: 'gamma',
    name: 'Gamma',
    colorA: '#0a1f18',
    colorB: '#2ecc71',
    colorC: '#d4ffec',
    radius: 0.28,
    distance: 8.0,
    speed: 0.15,
    spinSpeed: 0.8,
    seed: 91.1,
    year: '2023',
    role: 'Design Engineer',
    duration: '3 minggu',
    summary:
      'Design system untuk tim kecil yang benci meeting. Semua keputusan tertulis di kode, bukan di dokumen.',
    stack: ['TypeScript', 'Radix', 'CSS Modules'],
  },
]