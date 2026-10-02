export interface FuzzyResult {
  score: number
  indices: number[]
}

/**
 * Subsequence match dengan scoring.
 * Contoh: fuzzyScore('alp', 'Alpha') → match
 *         fuzzyScore('xyz', 'Alpha') → null (tidak match)
 */
export function fuzzyScore(query: string, target: string): FuzzyResult | null {
  const q = query.toLowerCase()
  const t = target.toLowerCase()

  if (!q) return { score: 0, indices: [] }

  let ti = 0
  let score = 0
  let streak = 0
  const indices: number[] = []

  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi]
    let found = -1

    // cari karakter berikutnya dari posisi ti
    while (ti < t.length) {
      if (t[ti] === ch) {
        found = ti
        break
      }
      ti++
    }

    if (found === -1) return null

    // bonus untuk match berurutan
    const prev = indices[indices.length - 1]
    streak = prev !== undefined && found === prev + 1 ? streak + 1 : 0
    score += 1 + streak * 0.6

    // bonus untuk match di awal kata
    if (found === 0) score += 2.2
    else if (
      t[found - 1] === ' ' ||
      t[found - 1] === '-' ||
      t[found - 1] === '_' ||
      t[found - 1] === '/'
    ) {
      score += 1.4
    }

    indices.push(found)
    ti = found + 1
  }

  // penalti kalau match tersebar jauh
  const spread = indices[indices.length - 1] - indices[0]
  score -= spread * 0.05

  return { score, indices }
}