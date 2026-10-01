import { useMission } from '../store/useMission'
import { planets } from '../data/planets'

export default function MissionPanel() {
  const activePlanetId = useMission((s) => s.activePlanetId)
  const closePlanet = useMission((s) => s.closePlanet)

  const planet = planets.find((p) => p.id === activePlanetId)

  return (
    <aside className={`panel ${planet ? 'panel--open' : ''}`}>
      {planet && (
        <>
          <header className="panel__header">
            <div className="panel__codename">
              {planet.name.toUpperCase()}
              <span className="panel__dot" />
            </div>
            <button
              type="button"
              className="panel__close"
              onClick={closePlanet}
              aria-label="Close"
            >
              <span />
              <span />
            </button>
          </header>

          <div className="panel__body">
            <div className="panel__meta">
              <div>
                <em>JARAK</em>
                <span>{planet.distance.toFixed(1)} AU</span>
              </div>
              <div>
                <em>RADIUS</em>
                <span>{planet.radius.toFixed(2)}</span>
              </div>
              <div>
                <em>ORBIT</em>
                <span>{planet.speed.toFixed(2)} rad/s</span>
              </div>
            </div>

            <h2 className="panel__title">
              {planet.name.charAt(0).toUpperCase() + planet.name.slice(1)}
            </h2>

            <p className="panel__summary">
              Ini adalah deskripsi placeholder untuk planet {planet.name}.
              Konten asli akan diisi dari content collection Markdown di sesi
              berikutnya.
            </p>

            <div className="panel__placeholder">
              <em>CATATAN</em>
              <p>
                Data project (tahun, role, stack, galeri) akan ditambahkan
                setelah kita bikin content collection dan project page.
              </p>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}