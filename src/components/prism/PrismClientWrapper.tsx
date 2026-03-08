'use client'
import dynamic from 'next/dynamic'

// R3F Canvas must not run on the server — disable SSR
const PrismScene = dynamic(() => import('./PrismScene'), { ssr: false })

export default function PrismClientWrapper() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: 'black', overflow: 'hidden' }}>
            <PrismScene />

            {/* Bottom-left text overlay */}
            <div style={{
                position: 'absolute',
                bottom: '12vh',
                left: '2.5rem',
                pointerEvents: 'none',
                userSelect: 'none',
                mixBlendMode: 'difference',
            }}>
                {['code create', 'collaborate'].map((word) => (
                    <p
                        key={word}
                        style={{
                            display: 'block',
                            margin: 0,
                            lineHeight: 1.05,
                            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                            fontWeight: 700,
                            fontFamily: "'Satoshi', 'Inter', 'Helvetica Neue', Arial, sans-serif",
                            color: 'white',
                            letterSpacing: '-0.03em',
                        }}
                    >
                        {word}
                    </p>
                ))}
            </div>
        </div>
    )
}
