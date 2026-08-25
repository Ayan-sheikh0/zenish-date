const TOTAL_STEPS = 5

export default function ProgressIndicator({ current }) {
  return (
    <div className="relative z-10 flex items-center justify-center gap-2 mb-6 select-none">
      {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
        const n = idx + 1
        const active = n === current
        const done = n < current
        return (
          <div key={n} className="flex items-center gap-2">
            <div
              className={`rounded-full transition-all duration-500 ${
                active ? 'w-3 h-3 bg-gold shadow-[0_0_10px_#D4AF6A]' : done ? 'w-1.5 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-gold-dim'
              }`}
            />
            {idx < TOTAL_STEPS - 1 && (
              <div className={`h-px w-4 sm:w-5 ${n < current ? 'bg-gold' : 'bg-gold-dim'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
