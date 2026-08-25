export default function SelectCard({ option, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(option.id)}
      aria-pressed={selected}
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 text-center
        bg-cream/[0.035] hover:-translate-y-1 active:scale-95 px-2 py-4 flex flex-col items-center gap-1.5
        ${selected ? 'border-gold bg-gold/10 shadow-card -translate-y-0.5' : 'border-gold-dim hover:border-gold/50'}
      `}
    >
      {option.image ? (
        <img
          src={option.image}
          alt={option.label}
          className="w-full h-16 object-cover rounded-lg mb-1"
          loading="lazy"
        />
      ) : (
        <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110">
          {option.emoji}
        </span>
      )}
      <span className="font-body text-xs sm:text-[13px] text-cream leading-tight">{option.label}</span>
      {option.sub && <span className="font-body text-[10px] text-cream-dim">{option.sub}</span>}

      {selected && (
        <div className="absolute top-1.5 right-1.5 w-[18px] h-[18px] rounded-full bg-gold text-night-0 flex items-center justify-center text-[10px] font-bold">
          ✓
        </div>
      )}
    </button>
  )
}
