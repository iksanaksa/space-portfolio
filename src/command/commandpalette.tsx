import { useEffect, useMemo, useRef, useState } from 'react'
import { useMission } from '../store/useMission'
import { planets } from '../data/planets'

interface Command {
  id: string
  group: string
  label: string
  hint?: string
  keywords: string[]
  action: () => void
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const openPlanet = useMission((s) => s.openPlanet)
  const closePlanet = useMission((s) => s.closePlanet)

  // daftar commands
  const commands = useMemo<Command[]>(() => {
    const list: Command[] = []

    // 1. buka panel planet
    planets.forEach((p) => {
      list.push({
        id: `open-${p.id}`,
        group: 'Proyek',
        label: p.name,
        hint: 'Buka panel',
        keywords: [p.id, p.name, p.role, ...p.stack],
        action: () => {
          openPlanet(p.id)
          setOpen(false)
        },
      })
    })

    // 2. buka halaman project
    planets.forEach((p) => {
      list.push({
        id: `goto-${p.id}`,
        group: 'Halaman',
        label: `/work/${p.id}`,
        hint: 'Buka halaman penuh',
        keywords: ['page', 'halaman', p.id],
        action: () => {
          window.location.href = `/work/${p.id}`
        },
      })
    })

    // 3. aksi umum
    list.push(
      {
        id: 'close-all',
        group: 'Aksi',
        label: 'Tutup semua panel',
        hint: 'Reset',
        keywords: ['close', 'tutup', 'reset'],
        action: () => {
          closePlanet()
          setOpen(false)
        },
      },
      {
        id: 'go-home',
        group: 'Aksi',
        label: 'Kembali ke Beranda',
        hint: 'Home',
        keywords: ['home', 'beranda', 'awal'],
        action: () => {
          window.location.href = '/'
        },
      }
    )

    return list
  }, [openPlanet, closePlanet])

  // filter sederhana: cek apakah query ada di label atau keywords
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => {
      const target = [c.label, ...c.keywords].join(' ').toLowerCase()
      return target.includes(q)
    })
  }, [commands, query])

  // reset index saat hasil berubah
  useEffect(() => {
    setIndex(0)
  }, [query])

  // hotkey Ctrl+K / Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey
      if (isCmd && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // autofocus input saat palette terbuka
  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  // freeze scroll body saat palette terbuka
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  // kelompokkan results
  const rows: { kind: 'header' | 'item'; label?: string; cmd?: Command; idx?: number }[] = []
  let lastGroup = ''
  results.forEach((c, i) => {
    if (c.group !== lastGroup) {
      rows.push({ kind: 'header', label: c.group })
      lastGroup = c.group
    }
    rows.push({ kind: 'item', cmd: c, idx: i })
  })

  const runCommand = (cmd: Command) => {
    cmd.action()
    setOpen(false)
  }

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(results.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = results[index]
      if (cmd) runCommand(cmd)
    }
  }

  return (
    <div className="cmd-backdrop" onMouseDown={() => setOpen(false)}>
      <div
        className="cmd"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="cmd__input-row">
          <span className="cmd__prompt">{'>'}</span>
          <input
            ref={inputRef}
            className="cmd__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Cari proyek, halaman, atau aksi…"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="cmd__esc">ESC</span>
        </div>

        <div className="cmd__list">
          {results.length === 0 && (
            <div className="cmd__empty">
              Tidak ada hasil untuk "{query}"
            </div>
          )}

          {rows.map((row, i) =>
            row.kind === 'header' ? (
              <div key={`h-${row.label}`} className="cmd__group">
                {row.label}
              </div>
            ) : (
              <button
                key={row.cmd!.id}
                type="button"
                className={`cmd__item ${row.idx === index ? 'is-active' : ''}`}
                onMouseEnter={() => setIndex(row.idx!)}
                onClick={() => runCommand(row.cmd!)}
              >
                <span>{row.cmd!.label}</span>
                {row.cmd!.hint && (
                  <span className="cmd__item-hint">{row.cmd!.hint}</span>
                )}
              </button>
            )
          )}
        </div>

        <div className="cmd__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigasi</span>
          <span><kbd>↵</kbd> pilih</span>
          <span><kbd>⌘</kbd><kbd>K</kbd> buka/tutup</span>
        </div>
      </div>
    </div>
  )
}