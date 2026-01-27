import { Scene } from "./ui/neon-raymarcher"

const NeonRaymarcherSection = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 700px' }}>
      <Scene />
    </section>
  )
}

export default NeonRaymarcherSection
