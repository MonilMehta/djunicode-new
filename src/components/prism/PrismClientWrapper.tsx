'use client'
import dynamic from 'next/dynamic'

// R3F Canvas must not run on the server — disable SSR
const PrismScene = dynamic(() => import('./PrismScene'), { ssr: false })

export default function PrismClientWrapper() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: 'black', overflow: 'hidden' }}>
            <PrismScene />


        </div>
    )
}
