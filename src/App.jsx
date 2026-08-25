import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { DateProvider, useDate } from './context/DateContext'
import AmbientBackground from './components/AmbientBackground'
import MusicPlayer from './components/MusicPlayer'
import LandingPage from './pages/LandingPage'
import FoodPage from './pages/FoodPage'
import PlacePage from './pages/PlacePage'
import WhenPage from './pages/WhenPage'
import FinalPage from './pages/FinalPage'

function RequireAnswered({ children }) {
  const { state } = useDate()
  if (!state.answered) return <Navigate to="/" replace />
  return children
}

function RequireFood({ children }) {
  const { state } = useDate()
  if (!state.answered) return <Navigate to="/" replace />
  if (state.food.length === 0) return <Navigate to="/food" replace />
  return children
}

function RequirePlace({ children }) {
  const { state } = useDate()
  if (!state.answered) return <Navigate to="/" replace />
  if (state.food.length === 0) return <Navigate to="/food" replace />
  if (state.places.length === 0) return <Navigate to="/place" replace />
  return children
}

function RequireWhen({ children }) {
  const { state } = useDate()
  if (!state.answered) return <Navigate to="/" replace />
  if (state.food.length === 0) return <Navigate to="/food" replace />
  if (state.places.length === 0) return <Navigate to="/place" replace />
  if (!state.chosenDate || !state.chosenTime) return <Navigate to="/when" replace />
  return children
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/food"
          element={
            <RequireAnswered>
              <FoodPage />
            </RequireAnswered>
          }
        />
        <Route
          path="/place"
          element={
            <RequireFood>
              <PlacePage />
            </RequireFood>
          }
        />
        <Route
          path="/when"
          element={
            <RequirePlace>
              <WhenPage />
            </RequirePlace>
          }
        />
        <Route
          path="/final"
          element={
            <RequireWhen>
              <FinalPage />
            </RequireWhen>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <DateProvider>
      <div className="relative min-h-[100dvh] w-full bg-night-0 overflow-x-hidden">
        <AmbientBackground />
        <MusicPlayer />
        <div className="relative z-10">
          <AnimatedRoutes />
        </div>
      </div>
    </DateProvider>
  )
}
