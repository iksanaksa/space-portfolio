import { create } from 'zustand'

interface MissionState {
  activePlanetId: string | null
  hoveredPlanetId: string | null
  sunOpen: boolean

  openPlanet: (id: string) => void
  closePlanet: () => void
  setHovered: (id: string | null) => void

  openSun: () => void
  closeSun: () => void

  closeAll: () => void
}

export const useMission = create<MissionState>((set) => ({
  activePlanetId: null,
  hoveredPlanetId: null,
  sunOpen: false,

  openPlanet: (id) => set({ activePlanetId: id, sunOpen: false }),
  closePlanet: () => set({ activePlanetId: null }),
  setHovered: (id) => set({ hoveredPlanetId: id }),

  openSun: () => set({ sunOpen: true, activePlanetId: null }),
  closeSun: () => set({ sunOpen: false }),

  closeAll: () => set({ activePlanetId: null, sunOpen: false }),
}))