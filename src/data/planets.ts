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
    colorA: '#0a2a4a',   // laut dalam
    colorB: '#4a90e2',   // laut terang
    colorC: '#cfe4ff',   // awan
    radius: 0.35,
    distance: 3.2,
    speed: 0.35,
    spinSpeed: 0.6,
    seed: 12.3,
  },
  {
    id: 'beta',
    name: 'Beta',
    colorA: '#3d1f14',   // tanah gelap
    colorB: '#e07a5f',   // tanah terang
    colorC: '#ffd9b3',   // awan
    radius: 0.42,
    distance: 4.6,
    speed: 0.22,
    spinSpeed: 0.5,
    seed: 47.8,
  },
  {
    id: 'gamma',
    name: 'Gamma',
    colorA: '#0a1f18',   // hutan gelap
    colorB: '#2ecc71',   // hutan terang
    colorC: '#d4ffec',   // awan
    radius: 0.28,
    distance: 6.0,
    speed: 0.15,
    spinSpeed: 0.8,
    seed: 91.1,
  },
]