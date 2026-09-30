import { useState } from 'react'

export default function TestReact() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      padding: '40px',
      border: '1px solid #ffd166',
      marginTop: '40px',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#5bc0be' }}>
        REACT COMPONENT
      </p>
      <p style={{ fontSize: '32px', color: '#ffd166', margin: '16px 0' }}>
        {count}
      </p>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          background: 'transparent',
          border: '1px solid #ffd166',
          color: '#ffd166',
          padding: '8px 20px',
          fontFamily: 'inherit',
          fontSize: '12px',
          letterSpacing: '0.2em',
          cursor: 'pointer',
        }}
      >
        TAMBAH
      </button>
    </div>
  )
}