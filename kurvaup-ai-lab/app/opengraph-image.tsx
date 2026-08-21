import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'KurvaUp AI Lab — AI Solutions for Project Control & Assurance'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          color: 'white',
          background:
            'radial-gradient(circle at 78% 18%, rgba(57,214,200,.22), transparent 28%), radial-gradient(circle at 25% 85%, rgba(108,99,255,.28), transparent 32%), #07111f',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 800,
              background: 'linear-gradient(135deg,#39D6C8,#6C63FF)',
              color: '#07111f',
            }}
          >
            K
          </div>
          <div style={{ fontSize: 38, fontWeight: 700 }}>KurvaUp AI Lab</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
          <div style={{ fontSize: 66, lineHeight: 1.05, fontWeight: 800, letterSpacing: -2 }}>
            AI Solutions for Project Control & Assurance
          </div>
          <div style={{ marginTop: 24, fontSize: 27, lineHeight: 1.35, color: 'rgba(255,255,255,.72)' }}>
            Practical AI products for project control, cost management, risk, schedule optimization, QA/QC, and analytics.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, color: 'rgba(255,255,255,.65)' }}>
          <span>Explore · Experiment · Improve</span>
          <span>ai.kurvaup.com</span>
        </div>
      </div>
    ),
    size
  )
}
