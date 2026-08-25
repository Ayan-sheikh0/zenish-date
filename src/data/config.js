// =========================================================================
// CENTRAL CONFIG — everything you'll want to personalize lives here.
//
// To use YOUR OWN photos instead of the emoji-illustration cards:
// 1. Drop your image files into  src/assets/food/  or  src/assets/places/
// 2. Import them at the top of this file, e.g.
//      import momosImg from '../assets/food/momos.jpg'
// 3. Set the `image` field below to that imported variable instead of null.
//    When `image` is null, a themed emoji illustration is shown automatically
//    (so nothing ever breaks or shows a broken-image icon).
// =========================================================================

export const HER_NAME = 'Zenish'

export const FOOD_OPTIONS = [
  { id: 'momos', label: 'Momos', emoji: '🥟', image: null },
  { id: 'noodles', label: 'Noodles', emoji: '🍜', image: null },
  { id: 'pizza', label: 'Pizza', emoji: '🍕', image: null },
  { id: 'burger', label: 'Burger', emoji: '🍔', image: null },
  { id: 'fries', label: 'French Fries', emoji: '🍟', image: null },
  { id: 'icecream', label: 'Ice Cream', emoji: '🍦', image: null },
  { id: 'coldcoffee', label: 'Cold Coffee / Milkshake', emoji: '🧋', image: null },
  { id: 'cake', label: 'Cake', emoji: '🍰', image: null },
  { id: 'chicken', label: 'Chicken', emoji: '🍗', image: null },
  { id: 'tacos', label: 'Tacos', emoji: '🌮', image: null },
]

export const PLACE_OPTIONS = [
  { id: 'movies', label: 'Movies / Cinema', emoji: '🎬', image: null },
  { id: 'cafe', label: 'Cafe', emoji: '☕', image: null },
  { id: 'garden', label: 'Garden / Park', emoji: '🌳', image: null },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️', image: null },
  { id: 'walk', label: 'Long Walk', emoji: '🌅', image: null },
  { id: 'amusement', label: 'Amusement Park', emoji: '🎡', image: null },
  { id: 'restaurant', label: 'Restaurant', emoji: '🍽️', image: null },
  { id: 'rooftop', label: 'City Evening / Rooftop', emoji: '🌆', image: null },
]

// Time-of-day options for the "When shall we go?" page. The actual day is
// picked from a rolling 10-day date strip generated at runtime.
export const TIME_OPTIONS = [
  { id: 'morning', label: 'Morning', emoji: '☀️', sub: '9am – 12pm' },
  { id: 'afternoon', label: 'Afternoon', emoji: '🌤️', sub: '12pm – 4pm' },
  { id: 'evening', label: 'Evening', emoji: '🌆', sub: '4pm – 7pm' },
  { id: 'night', label: 'Night', emoji: '🌙', sub: '7pm onward' },
]

export const DATE_STRIP_DAYS = 10

// Playful "NO button" runaway messages
export const NO_BUTTON_MESSAGES = [
  'No',
  'Are you sure? 🥺',
  'Think again ❤️',
  'Pleaseee 😭',
  'One chance? 🌹',
  "I'm shy, not gone 😂",
  'Still no? 😝',
  'Okay, last try 🥲',
]

// Background music — replace with your own royalty-free romantic track URL/path
export const MUSIC_SRC = null // e.g. '/music/romantic-theme.mp3'

export const STORAGE_KEY = 'zenish-date-invitation-v2'
