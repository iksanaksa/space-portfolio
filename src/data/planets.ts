export interface PlanetConfig {
  id: string
  name: string
  colorA: string
  colorB: string
  colorC: string
  radius: number
  distance: number
  speed: number
  spinSpeed: number
  seed: number
}

export const planets: PlanetConfig[] = [
  {
    id: 'alpha',
    name: 'Alpha',
    colorA: '#0a2a4a',
    colorB: '#4a90e2',
    colorC: '#cfe4ff',
    radius: 0.35,
    distance: 3.0,      // ← 3.2 → 3.0
    speed: 0.35,
    spinSpeed: 0.6,
    seed: 12.3,
  },
  {
    id: 'beta',
    name: 'Beta',
    colorA: '#3d1f14',
    colorB: '#e07a5f',
    colorC: '#ffd9b3',
    radius: 0.42,
    distance: 4.2,      // ← 4.6 → 4.2 (sekarang jauh dari belt)
    speed: 0.22,
    spinSpeed: 0.5,
    seed: 47.8,
  },
  {
    id: 'gamma',
    name: 'Gamma',
    colorA: '#0a1f18',
    colorB: '#2ecc71',
    colorC: '#d4ffec',
    radius: 0.28,
    distance: 8.0,      // ← 6.0 → 8.0 (jauh di luar belt)
    speed: 0.15,
    spinSpeed: 0.8,
    seed: 91.1,
  },
]