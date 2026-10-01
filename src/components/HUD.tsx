export default function HUD() {
  return (
    <div className="hud">
      <div className="hud__scanline" />

      <div className="hud__corner hud__corner--tl" />
      <div className="hud__corner hud__corner--tr" />
      <div className="hud__corner hud__corner--bl" />
      <div className="hud__corner hud__corner--br" />

      <div className="hud__mission">
        MISI // PORTOFOLIO
        <span className="hud__sub">SEKTOR 07 — LENGAN ORION</span>
      </div>

      <div className="hud__progress">
        <i style={{ width: '33%' }} />
      </div>

      <div className="hud__status">
        STATUS <b>AKTIF</b>
        <br />
        ORBIT <b>STABIL</b>
      </div>
    </div>
  )
}