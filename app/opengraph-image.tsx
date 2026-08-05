import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAFAF8',
          fontFamily: 'Georgia, serif'
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, color: '#0B0F14', display: 'flex' }}>
          2027<span style={{ color: '#E63946' }}>.</span>tours
        </div>
        <div style={{ fontSize: 32, color: '#6B7280', marginTop: 20, display: 'flex' }}>
          Concert & Tour Updates
        </div>
      </div>
    ),
    { ...size }
  )
}
