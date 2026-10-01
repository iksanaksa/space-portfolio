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
              ORION-{planet.name.toUpperCase()}
              <span className="panel__dot" />
            </div>
            <button
              type="button"
              className="panel__close"
              onClick={closePlanet}
              aria-label="Tutup"
            >
              <span />
              <span />
            </button>
          </header>

          <div className="panel__body">
            <div className="panel__meta">
              <div>
                <em>TAHUN</em>
                <span>{planet.year}</span>
              </div>
              <div>
                <em>PERAN</em>
                <span>{planet.role}</span>
              </div>
              <div>
                <em>DURASI</em>
                <span>{planet.duration}</span>
              </div>
            </div>

            <h2 className="panel__title">
              {planet.name.charAt(0).toUpperCase() + planet.name.slice(1)}
            </h2>

            <p className="panel__summary">{planet.summary}</p>

            <section className="panel__stack">
              <em className="panel__label">TEKNOLOGI</em>
              <ul>
                {planet.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>

            <a
              href={`/work/${planet.id}`}
              className="panel__fullpage"
            >
              <span>BUKA HALAMAN PENUH</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </>
      )}
    </aside>
  )
}