import { ImageResponse } from 'next/og';

export const alt = 'Code. Create. Collaborate. - DJ Unicode';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #020617, #1e1b4b, #312e81)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background decorative elements (safe for Satori) */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(79, 70, 229, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '60%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '80px 120px',
            borderRadius: '32px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'white',
              marginBottom: 32,
              display: 'flex',
              flexDirection: 'row',
              gap: '24px',
            }}
          >
            <span>Code.</span>
            <span style={{ color: '#818cf8' }}>Create.</span>
            <span style={{ color: '#c084fc' }}>Collaborate.</span>
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: '#d1d5db',
              display: 'flex',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            DJ Unicode
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
