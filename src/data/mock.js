// Mock data for the Gulmarg Smart Ski Guide. No backend yet.

export const band = {
  id: 'GM-4821',
  holder: 'Arjun Sharma',
  tier: 'Gulmarg Day Pass',
  deposit: 1000, // INR
  battery: 88,
}

export const currentWeather = {
  zone: 'Gulmarg Alpine Zone',
  temp: -8,
  elevation: 3980,
  wind: 18,
  gusts: 42,
  visibility: 4.2,
  snowDepth: 22,
  snowChance: 35, // % next 3h
  status: 'Open',
}

export const routes = [
  {
    id: 'a',
    name: 'Route A — Gondola Ridge',
    short: 'Route A',
    peak: 'Gondola Bowl',
    temp: -8,
    difficulty: 'Intermediate',
    level: 'Int',
    grade: 'Blue',
    status: 'Open',
    length: 3.9,
    elevationDrop: 620,
    condition: 'Groomed',
    duration: '18 min',
    color: '#3B9CE0',
    pin: { x: 25, y: 26 },
  },
  {
    id: 'b',
    name: 'Route B — Snow Bowl',
    short: 'Route B',
    peak: 'Avalanche Dam',
    temp: -6,
    difficulty: 'Advanced',
    level: 'Exp',
    grade: 'Black Diamond',
    status: 'Open',
    length: 3.4,
    elevationDrop: 1240,
    condition: 'Fresh Powder',
    duration: '35–45 min',
    color: '#0E2A47',
    optimal: true,
    pin: { x: 50, y: 17 },
  },
  {
    id: 'c',
    name: 'Route C — Pine Traverse',
    short: 'Route C',
    peak: 'Khilanmarg Bowl',
    temp: -4,
    difficulty: 'Beginner',
    level: 'Beg',
    grade: 'Green',
    status: 'Groomed',
    length: 2.1,
    elevationDrop: 300,
    condition: 'Packed Snow',
    duration: '25 min',
    color: '#10B981',
    pin: { x: 80, y: 24 },
  },
]

// 3-hour forecast per route, with the Safe / Not-recommended verdict.
export const routeForecast = {
  b: [
    { time: '08:00 – 10:00', temp: -7, wind: 14, cond: 'Prime groomed base', verdict: 'Safe' },
    { time: '11:00 – 13:00', temp: -6, wind: 18, cond: 'Fresh powder flurry', verdict: 'Safe' },
    { time: '13:00 – 16:00', temp: -9, wind: 32, cond: 'Wind slab risk on upper bowl', verdict: 'Not recommended' },
  ],
  a: [
    { time: '08:00 – 10:00', temp: -8, wind: 12, cond: 'Groomed corduroy', verdict: 'Safe' },
    { time: '11:00 – 13:00', temp: -6, wind: 15, cond: 'Soft spring snow', verdict: 'Safe' },
    { time: '13:00 – 16:00', temp: -7, wind: 20, cond: 'Reduced visibility', verdict: 'Not recommended' },
  ],
  c: [
    { time: '08:00 – 10:00', temp: -6, wind: 8, cond: 'Packed & gentle', verdict: 'Safe' },
    { time: '11:00 – 13:00', temp: -5, wind: 10, cond: 'Good visibility', verdict: 'Safe' },
    { time: '13:00 – 16:00', temp: -6, wind: 14, cond: 'Late-day soft patches', verdict: 'Safe' },
  ],
}

export const group = [
  { id: 'you', name: 'Arjun Sharma (You)', route: 'Route B', alt: 3240, battery: 88, state: 'active', lead: true },
  { id: 'ms', name: 'Mark Sorenson', route: 'Route A — Gondola Ridge', dist: '350m ahead', battery: 88, state: 'ok' },
  { id: 'sk', name: 'Sarah Khan', route: 'Route B — Snow Bowl', dist: '120m behind', battery: 94, state: 'ok' },
  { id: 'er', name: 'Elena Rostova', route: 'Kongdoori Base Cafe', dist: '8 min away', battery: 61, state: 'resting' },
]

export const runSummary = {
  title: 'Apharwat Peak → Kongdoori',
  route: 'Route B — Snow Bowl',
  distance: 14.2,
  vertical: 1240,
  time: '48m 12s',
  topSpeed: 64.8,
  badges: [
    { label: 'Powder Master', detail: '40cm fresh unpacked', xp: 150 },
    { label: 'Speed Demon', detail: 'Sector 2 personal best' },
    { label: 'G-Force Stable', detail: 'Wristband safety: OK' },
  ],
}

export const quickFeatures = [
  { key: 'routes', title: 'Explore Routes', desc: 'Live conditions, avalanche & radar', to: '/routes', icon: 'Compass', badge: '3 open' },
  { key: 'weather', title: 'Live Weather & Snow', desc: 'Currently -8°C at Apharwat Peak', to: '/routes', icon: 'CloudSnow', badge: '-8°C' },
  { key: 'tracking', title: 'Track Location', desc: 'Share GPS & fall-detection with group', to: '/tracking', icon: 'MapPin', badge: 'Live' },
  { key: 'return', title: 'Return & Refund', desc: 'Drop band and get your ₹1,000 deposit', to: '/return', icon: 'Wallet', badge: '₹1,000' },
]
