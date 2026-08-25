import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { TIME_OPTIONS, DATE_STRIP_DAYS } from '../data/config'
import { useDate } from '../context/DateContext'
import SelectCard from '../components/SelectCard'
import ProgressIndicator from '../components/ProgressIndicator'
import { Frame, BackLink } from '../components/Chrome'
import useAutoAdvance from '../hooks/useAutoAdvance'

function generateNextDays(n) {
  const days = []
  const today = new Date()
  for (let i = 0; i < n; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      id: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString(undefined, { weekday: 'short' }),
      day: d.getDate(),
      month: d.toLocaleDateString(undefined, { month: 'short' }),
      isToday: i === 0,
    })
  }
  return days
}

export default function WhenPage() {
  const navigate = useNavigate()
  const { state, setChosenDate, setChosenTime } = useDate()
  const days = useMemo(() => generateNextDays(DATE_STRIP_DAYS), [])

  const ready = Boolean(state.chosenDate && state.chosenTime)
  const { advancing } = useAutoAdvance(ready, `${state.chosenDate}|${state.chosenTime}`, '/final', 900)

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center px-5 py-14">
      <Frame className="max-w-2xl w-full px-5 sm:px-8 py-9 sm:py-10">
        <div className="relative z-10">
          <ProgressIndicator current={4} />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="font-display italic font-semibold text-2xl sm:text-3xl text-cream">
              When shall we go?
            </h1>
            <p className="mt-2 font-body text-cream-dim text-xs sm:text-sm">Pick a day and a moment ✨</p>
          </motion.div>

          <div
            className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {days.map((d) => {
              const selected = state.chosenDate === d.id
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setChosenDate(d.id)}
                  className={`flex-none min-w-[58px] rounded-2xl border px-1.5 py-2.5 flex flex-col items-center gap-0.5 transition-colors
                    ${selected ? 'border-gold bg-gold/10' : 'border-gold-dim bg-cream/[0.035] hover:border-gold/50'}
                  `}
                >
                  <span className="font-body text-[10px] uppercase text-cream-dim">
                    {d.isToday ? 'today' : d.weekday}
                  </span>
                  <span className={`font-display font-bold text-xl ${selected ? 'text-gold-light' : 'text-cream'}`}>
                    {d.day}
                  </span>
                  <span className="font-body text-[9.5px] text-cream-dim">{d.month}</span>
                </button>
              )
            })}
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5"
          >
            {TIME_OPTIONS.map((opt) => (
              <motion.div key={opt.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                <SelectCard
                  option={opt}
                  selected={state.chosenTime === opt.id}
                  onToggle={() => setChosenTime(opt.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-7 flex flex-col items-center gap-3 min-h-[2rem]">
            {advancing && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-xs text-gold flex items-center gap-2"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-sealPulse" />
                marking it on the calendar...
              </motion.p>
            )}
            <BackLink onClick={() => navigate('/place')} />
          </div>
        </div>
      </Frame>
    </div>
  )
}
