import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HER_NAME, NO_BUTTON_MESSAGES } from '../data/config'
import { useDate } from '../context/DateContext'
import { Frame, Ornament } from '../components/Chrome'

export default function LandingPage() {
  const navigate = useNavigate()
  const { setAnswered } = useDate()
  const [opened, setOpened] = useState(false)
  const [noPos, setNoPos] = useState(null)
  const [noAttempts, setNoAttempts] = useState(0)
  const [celebrating, setCelebrating] = useState(false)
  const containerRef = useRef(null)

  const noLabel = NO_BUTTON_MESSAGES[Math.min(noAttempts, NO_BUTTON_MESSAGES.length - 1)]

  // The NO button only ever moves within this container — it is always
  // rendered, always visible, and always tappable. It never disappears.
  const dodgeNo = () => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const btnW = 140
    const btnH = 52
    const padding = 16
    const maxX = Math.max(rect.width - btnW - padding, padding)
    const maxY = Math.max(rect.height - btnH - padding, padding)
    const x = padding + Math.random() * (maxX - padding)
    const y = padding + Math.random() * (maxY - padding)
    setNoPos({ x, y })
    setNoAttempts((n) => n + 1)
  }

  const handleYes = () => {
    setCelebrating(true)
    setAnswered(true)
    setTimeout(() => navigate('/food'), 1500)
  }

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-5 py-14">
      <Frame className="max-w-lg w-full min-h-[520px] px-6 sm:px-10 py-12 sm:py-14">
        <div ref={containerRef} className="relative z-10 text-center min-h-[440px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {celebrating ? (
              <motion.div
                key="celebrating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-6xl mb-3"
                >
                  ❤️
                </motion.div>
                <h2 className="font-display italic font-semibold text-3xl text-cream">She said YES!</h2>
                <ConfettiPetals />
              </motion.div>
            ) : !opened ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center animate-cardIn"
              >
                <div className="relative w-[150px] h-[104px] rounded-lg bg-gradient-to-br from-night-3 to-night-1 border border-gold-dim shadow-card mb-6">
                  <motion.button
                    type="button"
                    onClick={() => setOpened(true)}
                    whileTap={{ scale: 0.92 }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    aria-label="Break the wax seal to open the letter"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full
                               bg-[radial-gradient(circle_at_35%_30%,#E37A93,#6B1530)] flex items-center justify-center
                               text-lg text-gold-light shadow-card"
                  >
                    ❤
                  </motion.button>
                </div>
                <p className="font-script text-2xl text-gold-light mb-1">a letter for you</p>
                <p className="font-body text-sm text-cream-dim mb-7">
                  {HER_NAME}, someone has something to ask
                </p>
                <button
                  type="button"
                  onClick={() => setOpened(true)}
                  className="px-8 py-3 rounded-full border border-gold text-gold-light font-body text-sm tracking-wide hover:bg-gold/10 transition-colors"
                >
                  Open the letter
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <p className="font-script text-2xl text-gold-light mb-2">a little question for you</p>
                <h1 className="font-display italic font-semibold text-3xl sm:text-4xl md:text-[42px] text-cream leading-tight animate-flicker">
                  {HER_NAME}, will you go
                  <br />
                  on a date with me?
                </h1>
                <Ornament />
                <p className="font-body text-cream-dim text-sm sm:text-base max-w-sm mx-auto mb-9">
                  I really hope you say yes. 🌹
                </p>

                <div className="relative flex items-center justify-center gap-4 flex-wrap min-h-[90px]">
                  <motion.button
                    type="button"
                    onClick={handleYes}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative z-20 px-9 py-4 rounded-full font-body text-sm tracking-wide text-cream
                               bg-gradient-to-r from-rose to-wine shadow-glow"
                  >
                    YES ❤️
                  </motion.button>

                  {noPos === null ? (
                    <button
                      type="button"
                      onPointerDown={(e) => {
                        e.preventDefault()
                        dodgeNo()
                      }}
                      onMouseEnter={dodgeNo}
                      style={{ touchAction: 'none' }}
                      className="min-h-[48px] min-w-[96px] px-7 py-4 rounded-full font-body text-sm text-cream-dim
                                 bg-cream/[0.06] border border-gold-dim select-none whitespace-nowrap"
                    >
                      {noLabel}
                    </button>
                  ) : (
                    <motion.button
                      type="button"
                      onPointerDown={(e) => {
                        e.preventDefault()
                        dodgeNo()
                      }}
                      onMouseEnter={dodgeNo}
                      animate={{ left: noPos.x, top: noPos.y }}
                      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                      style={{ position: 'absolute', touchAction: 'none' }}
                      className="z-30 min-h-[48px] min-w-[96px] px-7 py-4 rounded-full font-body text-sm text-cream-dim
                                 bg-cream/[0.08] border border-gold-dim select-none whitespace-nowrap shadow-card"
                    >
                      {noLabel}
                    </motion.button>
                  )}
                </div>

                {noAttempts > 2 && (
                  <p className="mt-4 text-[11px] sm:text-xs text-cream-dim font-body italic">
                    the YES button isn't going anywhere 👉
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Frame>
    </div>
  )
}

function ConfettiPetals() {
  const pieces = Array.from({ length: 22 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    glyph: ['❤️', '🌸', '✨', '💗'][i % 4],
    duration: 1.6 + Math.random() * 1,
  }))
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
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
