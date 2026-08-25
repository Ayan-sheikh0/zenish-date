export function BackLink({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-body text-xs text-cream-dim hover:text-gold-light underline underline-offset-4 transition-colors"
    >
      ← back
    </button>
  )
}

export function Ornament() {
  return (
    <div className="flex items-center justify-center gap-2.5 my-3" aria-hidden="true">
      <span className="w-8 h-px bg-gradient-to-r from-transparent to-gold" />
      <span className="text-gold text-sm">❦</span>
      <span className="w-8 h-px bg-gradient-to-l from-transparent to-gold" />
    </div>
  )
}

export function Frame({ children, className = '' }) {
  return (
    <div
      className={`relative w-full rounded-[1.4rem] border border-gold-dim bg-romantic-gradient shadow-glass overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}
