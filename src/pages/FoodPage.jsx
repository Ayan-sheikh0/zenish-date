import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FOOD_OPTIONS } from '../data/config'
import { useDate } from '../context/DateContext'
import SelectCard from '../components/SelectCard'
import ProgressIndicator from '../components/ProgressIndicator'
import { Frame, BackLink } from '../components/Chrome'
import { useAutoAdvanceOnSelection } from '../hooks/useAutoAdvance'

export default function FoodPage() {
  const navigate = useNavigate()
  const { state, toggleFood } = useDate()
  const { advancing } = useAutoAdvanceOnSelection(state.food, '/place', 1000)

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center px-5 py-14">
      <Frame className="max-w-2xl w-full px-5 sm:px-8 py-9 sm:py-10">
        <div className="relative z-10">
          <ProgressIndicator current={2} />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="font-display italic font-semibold text-2xl sm:text-3xl text-cream">
              What shall we eat?
            </h1>
            <p className="mt-2 font-body text-cream-dim text-xs sm:text-sm">
              You choose, I'll handle the rest. 😋
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-3.5"
          >
            {FOOD_OPTIONS.map((opt) => (
              <motion.div key={opt.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                <SelectCard option={opt} selected={state.food.includes(opt.id)} onToggle={toggleFood} />
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
                sweet choice, moving on...
              </motion.p>
            )}
            <BackLink onClick={() => navigate('/')} />
          </div>
        </div>
      </Frame>
    </div>
  )
}
