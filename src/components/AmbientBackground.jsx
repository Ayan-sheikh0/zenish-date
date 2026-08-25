function Star({ style }) {
  return <span className="absolute rounded-full bg-gold-light animate-twinkle" style={style} />
}

export default function AmbientBackground({ starCount = 26, petalCount = 10 }) {
  const stars = Array.from({ length: starCount }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 4,
    duration: 2.5 + Math.random() * 2.5,
  }))

  const petals = Array.from({ length: petalCount }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 9 + Math.random() * 6,
    size: 12 + Math.random() * 10,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {stars.map((s) => (
        <Star
          key={s.id}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute text-lg opacity-0 animate-petalFall select-none"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            fontSize: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  )
}
