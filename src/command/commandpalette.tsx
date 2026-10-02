import { useEffect, useMemo, useRef, useState } from 'react'
import { useMission } from '../store/useMission'
import { planets } from '../data/planets'
import { fuzzyScore } from './fuzzy'

interface Command {
  id: string
  group: string
  label: string
  hint?: string
  keywords: string[]
  action: () => void
}

interface ScoredCommand {
  cmd: Command
  score: number
  indices: number[]
  labelIndices: number[]
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const openPlanet = useMission((s) => s.openPlanet)
  const closePlanet = useMission((s) => s.closePlanet)

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = []

    planets.forEach((p) => {
      list.push({
        id: `open-${p.id}`,
        group: 'Proyek',
        label: p.name,
        hint: 'Buka panel',
        keywords: [p.id, p.role, ...p.stack],
        action: () => {
          openPlanet(p.id)
          setOpen(false)
        },
      })
    })

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

  // fuzzy filter + sort
  const results = useMemo<ScoredCommand[]>(() => {
    const q = query.trim()

    // tanpa query: tampilkan semua tanpa skor, urutan asli
    if (!q) {
      return commands.map((cmd) => ({
        cmd,
        score: 0,
        indices: [],
        labelIndices: [],
      }))
    }

    const scored: ScoredCommand[] = []

    for (const cmd of commands) {
      // coba match ke label dulu
      const labelResult = fuzzyScore(q, cmd.label)

      // match ke label DAN keywords, ambil yang terbaik
      let bestScore = labelResult?.score ?? -Infinity
      let bestIndices = labelResult?.indices ?? []

      for (const kw of cmd.keywords) {
        const kwResult = fuzzyScore(q, kw)
        if (kwResult && kwResult.score > bestScore) {
          bestScore = kwResult.score
          bestIndices = []
        }
      }

      if (bestScore > -Infinity) {
        // boost kalau match di label
        const labelBoost = labelResult ? 1.4 : 1.0
        scored.push({
          cmd,
          score: bestScore * labelBoost,
          indices: bestIndices,
          labelIndices: labelResult?.indices ?? [],
        })
      }
    }

    return scored.sort((a, b) => b.score - a.score)
  }, [commands, query])

  // reset index saat hasil berubah
  useEffect(() => {
    setIndex(0)
  }, [query])

  // auto-scroll item aktif ke viewport
  useEffect(() => {
    if (!open) return
    const list = listRef.current
    if (!list) return
    const active = list.querySelector('.cmd__item.is-active')
    if (active) {
      active.scrollIntoView({ block: 'nearest' })
    }
  }, [index, open])

  // hotkey
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

  // autofocus
  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  // freeze body scroll
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  // render rows: header + item
  const rows: {
    kind: 'header' | 'item'
    label?: string
    scored?: ScoredCommand
    idx?: number
  }[] = []

  // grup berdasarkan urutan kemunculan di results
  let lastGroup = ''
  results.forEach((sc, i) => {
    if (sc.cmd.group !== lastGroup) {
      rows.push({ kind: 'header', label: sc.cmd.group })
      lastGroup = sc.cmd.group
    }
    rows.push({ kind: 'item', scored: sc, idx: i })
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
      const sc = results[index]
      if (sc) runCommand(sc.cmd)
    } else if (e.key === 'Tab') {
      // Tab untuk autofill query dari item aktif
      e.preventDefault()
      const sc = results[index]
      if (sc) setQuery(sc.cmd.label)
    }
  }

  // highlight karakter yang match di label
  const highlight = (text: string, indices: number[]) => {
    if (indices.length === 0) return text
    const set = new Set(indices)
    return [...text].map((ch, i) =>
      set.has(i) ? (
        <mark key={i} className="cmd__mark">
          {ch}
        </mark>
      ) : (
        <span key={i}>{ch}</span>
      )
    )
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

        <div ref={listRef} className="cmd__list">
          {results.length === 0 && (
            <div className="cmd__empty">
              Tidak ada hasil untuk "{query}"
            </div>
          )}

          {rows.map((row, i) =>
            row.kind === 'header' ? (
              <div key={`h-${row.label}-${i}`} className="cmd__group">
                {row.label}
              </div>
            ) : (
              <button
                key={row.scored!.cmd.id}
                type="button"
                className={`cmd__item ${
                  row.idx === index ? 'is-active' : ''
                }`}
                onMouseEnter={() => setIndex(row.idx!)}
                onClick={() => runCommand(row.scored!.cmd)}
              >
                <span>
                  {highlight(
                    row.scored!.cmd.label,
                    row.scored!.labelIndices
                  )}
                </span>
                {row.scored!.cmd.hint && (
                  <span className="cmd__item-hint">
                    {row.scored!.cmd.hint}
                  </span>
                )}
              </button>
            )
          )}
        </div>

        <div className="cmd__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigasi</span>
          <span><kbd>↵</kbd> pilih</span>
          <span><kbd>Tab</kbd> isi otomatis</span>
          <span><kbd>⌘</kbd><kbd>K</kbd> buka/tutup</span>
        </div>
      </div>
    </div>
  )
}