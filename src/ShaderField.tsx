import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

/*
 * The Interstellar preset, re-parameterized into the brand (WEBSITE_DESIGN.md §3.1):
 * mostly page-black field, dark moss midtone, lime only on thin wave crests.
 * Slow, grainy, low brightness — "slow interstellar dust", never casino.
 */
export default function ShaderField() {
  const pixelDensity = Math.min(window.devicePixelRatio || 1, 1.5)
  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0 }}
      pixelDensity={pixelDensity}
      fov={45}
    >
      <ShaderGradient
        control="props"
        type="waterPlane"
        animate="on"
        uTime={0}
        uSpeed={0.15}
        uStrength={2.2}
        uDensity={1.4}
        uFrequency={5.5}
        uAmplitude={0}
        color1="#0c0c0c"
        color2="#22300f"
        color3="#c9f227"
        brightness={1}
        grain="on"
        lightType="3d"
        envPreset="city"
        reflection={0.1}
        cDistance={3.2}
        cPolarAngle={95}
        cAzimuthAngle={180}
        cameraZoom={1}
        positionX={0}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}
