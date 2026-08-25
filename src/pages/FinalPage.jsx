import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FOOD_OPTIONS, PLACE_OPTIONS, TIME_OPTIONS, HER_NAME } from '../data/config'
import { useDate } from '../context/DateContext'
import ProgressIndicator from '../components/ProgressIndicator'
import { Frame, Ornament, BackLink } from '../components/Chrome'

export default function FinalPage() {
  const navigate = useNavigate()
  const { state, setFinalized, restart } = useDate()
  const [confirmed, setConfirmed] = useState(state.finalized)

  const chosenFood = FOOD_OPTIONS.filter((f) => state.food.includes(f.id))
  const chosenPlaces = PLACE_OPTIONS.filter((p) => state.places.includes(p.id))
  const chosenTime = TIME_OPTIONS.find((t) => t.id === state.chosenTime)
  const dateLabel = state.chosenDate
    ? new Date(state.chosenDate).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const handleConfirm = () => {
    setConfirmed(true)
    setFinalized(true)
  }

  const handleRestart = () => {
    restart()
    navigate('/')
  }

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center px-5 py-14">
      <Frame className="max-w-2xl w-full px-5 sm:px-8 py-9 sm:py-10">
        <div className="relative z-10 text-center">
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.div key="plan" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <ProgressIndicator current={5} />
                <span className="text-4xl">💌</span>
                <h1 className="mt-1 font-display italic font-semibold text-3xl text-cream">It's a date!</h1>
                <Ornament />

                {dateLabel && (
                  <div className="text-left bg-cream/[0.04] border border-gold-dim rounded-2xl p-3.5 mb-3.5">
                    <p className="font-body text-[10px] tracking-widest uppercase text-gold mb-1.5">When</p>
                    <p className="font-display text-lg text-cream">
                      {dateLabel} {chosenTime && `· ${chosenTime.emoji} ${chosenTime.label}`}
                    </p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3 text-left mb-5">
                  <div className="bg-cream/[0.04] border border-gold-dim rounded-2xl p-3.5">
                    <p className="font-body text-[10px] tracking-widest uppercase text-gold mb-2">Food</p>
                    <div className="flex flex-wrap gap-1.5">
                      {chosenFood.length === 0 && <span className="text-cream-dim text-xs italic">nothing selected</span>}
                      {chosenFood.map((f) => (
                        <span
                          key={f.id}
                          className="text-[11px] font-body bg-rose/[0.15] text-rose rounded-full px-2.5 py-1"
                        >
                          {f.emoji} {f.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-cream/[0.04] border border-gold-dim rounded-2xl p-3.5">
                    <p className="font-body text-[10px] tracking-widest uppercase text-gold mb-2">Place</p>
                    <div className="flex flex-wrap gap-1.5">
                      {chosenPlaces.length === 0 && <span className="text-cream-dim text-xs italic">nothing selected</span>}
                      {chosenPlaces.map((p) => (
                        <span
                          key={p.id}
                          className="text-[11px] font-body bg-rose/[0.15] text-rose rounded-full px-2.5 py-1"
                        >
                          {p.emoji} {p.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="font-display italic text-lg sm:text-xl text-cream mb-2">
                  {HER_NAME}, I'm really happy you said yes.
                </p>
                <p className="font-body text-cream-dim text-[13px] leading-relaxed max-w-sm mx-auto">
                  Now all that's left is a little time together, some good food, lots of laughs, and a
                  beautiful memory we'll always remember. 🌹✨
                </p>

                <motion.button
                  type="button"
                  onClick={handleConfirm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-7 px-8 py-3.5 rounded-full font-body text-sm tracking-wide text-cream
                             bg-gradient-to-r from-rose to-wine shadow-glow"
                >
                  Our Date Is Official ❤️
                </motion.button>

                <div className="mt-6">
                  <BackLink onClick={handleRestart} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="celebrated"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10"
              >
                <div className="text-5xl mb-3 animate-sealPulse">❤️</div>
                <p className="font-display italic font-semibold text-3xl text-cream">Can't wait! 🥰❤️</p>
                <p className="mt-2 font-body text-cream-dim text-sm">Our date is officially official.</p>
                <div className="mt-8">
                  <BackLink onClick={handleRestart} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Frame>

      {confirmed && <FinalConfetti />}
    </div>
  )
}

function FinalConfetti() {
  const pieces = Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    glyph: ['❤️', '🌸', '✨', '💗'][i % 4],
    duration: 1.8 + Math.random() * 1.2,
  }))
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-40">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-2xl"
          style={{ left: `${p.left}%`, top: '-5%' }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{ duration: p.duration + 1.2, delay: p.delay, ease: 'easeIn' }}
        >
          {p.glyph}
        </motion.span>
      ))}
    </div>
  )
}
