'use client'

import dynamic from 'next/dynamic'

const UnicornStudioEmbed = dynamic(() => import('./AuroraShader'), { ssr: false })

export default function AuroraClientWrapper() {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            {/* UnicornStudio fills the whole container */}
            <UnicornStudioEmbed />

            {/* Bottom fade into page body */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(247,241,230,0.92) 100%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            />


        </div>
    )
}
