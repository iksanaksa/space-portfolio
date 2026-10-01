import { create } from 'zustand'

interface MissionState {
  activePlanetId: string | null
  hoveredPlanetId: string | null
  openPlanet: (id: string) => void
  closePlanet: () => void
  setHovered: (id: string | null) => void
}

export const useMission = create<MissionState>((set) => ({
  activePlanetId: null,
  hoveredPlanetId: null,
  openPlanet: (id) => set({ activePlanetId: id }),
  closePlanet: () => set({ activePlanetId: null }),
  setHovered: (id) => set({ hoveredPlanetId: id }),
}))