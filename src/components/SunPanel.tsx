import { useMission } from '../store/useMission'
import { profile } from '../data/profile'

export default function SunPanel() {
  const sunOpen = useMission((s) => s.sunOpen)
  const closeSun = useMission((s) => s.closeSun)

  return (
    <aside className={`panel panel--sun ${sunOpen ? 'panel--open' : ''}`}>
      {sunOpen && (
        <>
          <header className="panel__header">
            <div className="panel__codename">
              MATAHARI // ABOUT
              <span className="panel__dot" />
            </div>
            <button
              type="button"
              className="panel__close"
              onClick={closeSun}
              aria-label="Tutup"
            >
              <span />
              <span />
            </button>
          </header>

          <div className="panel__body">
            <div className="panel__meta">
              <div>
                <em>NAMA</em>
                <span>{profile.shortName}</span>
              </div>
              <div>
                <em>LOKASI</em>
                <span>{profile.location}</span>
              </div>
            </div>

            <h2 className="panel__title">{profile.shortName}</h2>

            <p className="panel__summary">{profile.bio}</p>

            <section className="panel__stack">
              <em className="panel__label">KONTAK</em>
              <ul style={{ flexDirection: 'column', gap: 0, alignItems: 'stretch' }}>
                <li style={{ width: '100%', justifyContent: 'space-between', display: 'flex' }}>
                  <span>Email</span>
                  <a href={`mailto:${profile.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    {profile.email}
                  </a>
                </li>
              </ul>
            </section>

            <section className="panel__stack">
              <em className="panel__label">SOSIAL MEDIA</em>
              <ul style={{ flexDirection: 'column', gap: 0, alignItems: 'stretch' }}>
                {profile.socials.map((s) => (
                  <li
                    key={s.url}
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      display: 'flex',
                      textTransform: 'none',
                    }}
                  >
                    <span>{s.label}</span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--accent)', textDecoration: 'none' }}
                    >
                      {s.handle} →
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <p
              style={{
                fontSize: 11,
                color: 'var(--muted)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginTop: 24,
              }}
            >
              Klik planet untuk melihat proyek.
            </p>
          </div>
        </>
      )}
    </aside>
  )
}