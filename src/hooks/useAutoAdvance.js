import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Auto-navigates to `nextPath` once `ready` becomes true, after `delay` ms
 * of inactivity. The timer resets any time `watchKey` changes (so picking a
 * 2nd/3rd item, or changing an earlier choice, doesn't cut the pause short).
 * No "Continue" button is ever shown — pages render a small status line
 * instead, driven by the returned `advancing` flag.
 */
export default function useAutoAdvance(ready, watchKey, nextPath, delay = 1000) {
  const navigate = useNavigate()
  const [advancing, setAdvancing] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!ready) {
      setAdvancing(false)
      return
    }

    setAdvancing(true)
    timerRef.current = setTimeout(() => {
      navigate(nextPath)
    }, delay)

    return () => clearTimeout(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, watchKey])

  return { advancing }
}

/** Convenience helper for array-based selections (food/place pages). */
export function useAutoAdvanceOnSelection(selection, nextPath, delay = 1000) {
  return useAutoAdvance(selection.length > 0, JSON.stringify(selection), nextPath, delay)
}
