import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Ticket, Mountain, Radio, Wallet } from 'lucide-react'

// The ONE consistent bottom nav — identical on every main screen.
const tabs = [
  { to: '/welcome', label: 'My Pass', icon: Ticket, match: ['/welcome'] },
  { to: '/routes', label: 'Routes', icon: Mountain, match: ['/routes'] },
  { to: '/tracking', label: 'Tracking', icon: Radio, match: ['/tracking'] },
  { to: '/return', label: 'Return', icon: Wallet, match: ['/return'] },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav
      className="absolute bottom-0 inset-x-0 z-30 glass border-t border-white/70"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex items-stretch justify-around px-2 pt-1.5 pb-1.5">
        {tabs.map((tab) => {
          const active = tab.match.some((m) => pathname.startsWith(m))
          const Icon = tab.icon
          return (
            <li key={tab.to} className="flex-1">
              <NavLink
                to={tab.to}
                className="relative flex flex-col items-center gap-0.5 py-1.5 rounded-2xl"
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-3 inset-y-0 rounded-2xl bg-glacier/12"
                    transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                  />
                )}
                <motion.span
                  animate={{ y: active ? -1 : 0, scale: active ? 1.06 : 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`relative z-10 ${active ? 'text-glacier' : 'text-slope'}`}
                >
                  <Icon size={22} strokeWidth={active ? 2.6 : 2} />
                </motion.span>
                <span
                  className={`relative z-10 text-[10.5px] font-semibold ${
                    active ? 'text-glacier' : 'text-slope'
                  }`}
                >
                  {tab.label}
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
