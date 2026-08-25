import { createContext, useContext, useEffect, useState } from 'react'
import { STORAGE_KEY } from '../data/config'

const DateContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    // ignore corrupt storage
  }
  return { answered: false, food: [], places: [], chosenDate: null, chosenTime: null, finalized: false }
}

export function DateProvider({ children }) {
  const [state, setState] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      // storage may be unavailable — fail silently
    }
  }, [state])

  const setAnswered = (val) => setState((s) => ({ ...s, answered: val }))

  const toggleFood = (id) =>
    setState((s) => ({
      ...s,
      food: s.food.includes(id) ? s.food.filter((f) => f !== id) : [...s.food, id],
    }))

  const togglePlace = (id) =>
    setState((s) => ({
      ...s,
      places: s.places.includes(id) ? s.places.filter((p) => p !== id) : [...s.places, id],
    }))

  const setChosenDate = (dateId) => setState((s) => ({ ...s, chosenDate: dateId }))
  const setChosenTime = (timeId) => setState((s) => ({ ...s, chosenTime: timeId }))

  const setFinalized = (val) => setState((s) => ({ ...s, finalized: val }))

  const restart = () => {
    const fresh = { answered: false, food: [], places: [], chosenDate: null, chosenTime: null, finalized: false }
    setState(fresh)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {}
  }

  return (
    <DateContext.Provider
      value={{
        state,
        setAnswered,
        toggleFood,
        togglePlace,
        setChosenDate,
        setChosenTime,
        setFinalized,
        restart,
      }}
    >
      {children}
    </DateContext.Provider>
  )
}

export function useDate() {
  const ctx = useContext(DateContext)
  if (!ctx) throw new Error('useDate must be used within DateProvider')
  return ctx
}
