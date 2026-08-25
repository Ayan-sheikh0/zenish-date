import { useEffect, useRef, useState } from 'react'
import { MUSIC_SRC } from '../data/config'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!MUSIC_SRC) return
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }, [playing])

  if (!MUSIC_SRC) {
    return (
      <button
        type="button"
        title="Add a track in src/data/config.js (MUSIC_SRC) to enable music"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-cream/[0.06] backdrop-blur-md
                   border border-gold-dim px-3 py-2 text-cream-dim text-sm opacity-70 cursor-default"
      >
        <span>🎵</span>
      </button>
    )
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop />
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-cream/[0.06] backdrop-blur-md
                   border border-gold-dim px-4 py-2 text-cream-dim text-sm font-body
                   hover:border-gold hover:text-gold-light transition-all duration-300 active:scale-95"
      >
        <span className={playing ? 'animate-sealPulse' : ''}>{playing ? '⏸' : '▶️'}</span>
        <span className="hidden sm:inline">{playing ? 'Pause music' : 'Play music'}</span>
      </button>
    </>
  )
}
