'use client'

import { useEffect } from 'react'

declare global {
    interface Window {
        UnicornStudio?: {
            isInitialized: boolean
            init?: () => void
            destroy?: () => void
        }
    }
}

const SCRIPT_SRC = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.0-1/dist/unicornStudio.umd.js'
const PROJECT_ID = 'SrJYfPcDUR4StI3maLL6'

function initUnicorn() {
    if (!window.UnicornStudio) {
        window.UnicornStudio = { isInitialized: false }
        const s = document.createElement('script')
        s.src = SCRIPT_SRC
        s.onload = () => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    window.UnicornStudio!.init?.()
                    window.UnicornStudio!.isInitialized = true
                })
            } else {
                window.UnicornStudio!.init?.()
                window.UnicornStudio!.isInitialized = true
            }
        }
        ;(document.head || document.body).appendChild(s)
    } else if (!window.UnicornStudio.isInitialized && window.UnicornStudio.init) {
        window.UnicornStudio.init()
        window.UnicornStudio.isInitialized = true
    }
}

export default function UnicornStudioEmbed() {
    useEffect(() => {
        initUnicorn()
    }, [])

    return (
        <div
            data-us-project={PROJECT_ID}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
    )
}
