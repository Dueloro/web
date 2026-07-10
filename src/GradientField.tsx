import { lazy, Suspense, useEffect, useState } from 'react'

const ShaderField = lazy(() => import('./ShaderField'))

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * The single depth element of the site. Renders the static composition
 * immediately; mounts the WebGL gradient after first paint, and only when
 * motion is allowed and WebGL is available.
 */
export function GradientField({ className }: { className: string }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !canUseWebGL()) return
    const id = window.setTimeout(() => setReady(true), 300)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className={className} aria-hidden="true">
      <div className="field-static" />
      {ready && (
        <Suspense fallback={null}>
          <ShaderField />
        </Suspense>
      )}
    </div>
  )
}
