export interface CategoryOption {
  id: string
  label: string
  emoji: string
  tint: string
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'everyday-objects', label: 'Everyday Objects', emoji: '📦', tint: '#F0DEC8' },
  { id: 'famous-people', label: 'Famous People', emoji: '⭐', tint: '#FDF3C4' },
  { id: 'foods-drinks', label: 'Foods & Drinks', emoji: '🍔', tint: '#FBE3C6' },
  { id: 'animals', label: 'Animals', emoji: '🐾', tint: '#E7D8C6' },
  { id: 'brands-logos', label: 'Brands & Logos', emoji: '🏷️', tint: '#F3E6CE' },
  { id: 'colours-shapes', label: 'Colours & Shapes', emoji: '🎨', tint: '#FCD9E3' },
  { id: 'countries-cities', label: 'Countries & Cities', emoji: '🌍', tint: '#D7F0E0' },
  { id: 'emotions-feelings', label: 'Emotions & Feelings', emoji: '😊', tint: '#FDEEC0' },
  { id: 'hobbies-activities', label: 'Hobbies & Activities', emoji: '🎯', tint: '#FBD6D6' },
  { id: 'internet-culture', label: 'Internet Culture', emoji: '💻', tint: '#DCE6F0' },
  { id: 'kitchen-cooking', label: 'Kitchen & Cooking', emoji: '🍳', tint: '#FBEACB' },
  { id: 'movies-tv-shows', label: 'Movies & TV Shows', emoji: '🎬', tint: '#E4E4E8' },
  { id: 'music-bands', label: 'Music & Bands', emoji: '🎵', tint: '#D8E1F5' },
  { id: 'occupations', label: 'Occupations', emoji: '💼', tint: '#EDDCC8' },
  { id: 'school-education', label: 'School & Education', emoji: '🎓', tint: '#FBEAC0' },
  { id: 'science-technology', label: 'Science & Technology', emoji: '🔬', tint: '#D6EAF5' },
  { id: 'sports', label: 'Sports', emoji: '🏆', tint: '#FDF0C4' },
  { id: 'superheroes', label: 'Superheroes', emoji: '🦸', tint: '#FBD6D6' },
  { id: 'transportation', label: 'Transportation', emoji: '🚗', tint: '#FBD6D2' },
  { id: 'video-games', label: 'Video Games', emoji: '🎮', tint: '#E3DEF5' },
  { id: 'weather-nature', label: 'Weather & Nature', emoji: '🌦️', tint: '#D6EAF7' },
]
