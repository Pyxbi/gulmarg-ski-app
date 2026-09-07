import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav.jsx'

import Scan from './pages/Scan.jsx'
import Activating from './pages/Activating.jsx'
import Welcome from './pages/Welcome.jsx'
import RoutesPage from './pages/Routes.jsx'
import RouteMap from './pages/RouteMap.jsx'
import RouteDetail from './pages/RouteDetail.jsx'
import Tracking from './pages/Tracking.jsx'
import Sos from './pages/Sos.jsx'
import RunSummary from './pages/RunSummary.jsx'
import ShareStory from './pages/ShareStory.jsx'
import Return from './pages/Return.jsx'
import VerifyBand from './pages/VerifyBand.jsx'
import RefundMethod from './pages/RefundMethod.jsx'
import RefundReceipt from './pages/RefundReceipt.jsx'

// Screens where the bottom nav is hidden (onboarding + full-screen alert).
const NO_NAV = ['/scan', '/activating', '/tracking/sos', '/tracking/share']

export default function App() {
  const location = useLocation()
  const path = location.pathname
  const showNav = !NO_NAV.includes(path)

  return (
    <div className="min-h-full w-full flex items-center justify-center sm:p-4">
      {/* Phone frame — 390px column, faux-device chrome on larger screens */}
      <div className="relative w-full sm:w-[390px] h-[100dvh] sm:h-[844px] sm:max-h-[92vh] bg-glacierwhite overflow-hidden sm:rounded-[2.4rem] sm:shadow-modal sm:ring-1 sm:ring-black/5">
        {/* Scrollable content region */}
        <main className="absolute inset-0 overflow-y-auto no-scrollbar" style={{ paddingBottom: showNav ? '78px' : 0 }}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={path}>
              <Route path="/" element={<Navigate to="/scan" replace />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/activating" element={<Activating />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/routes/:id" element={<RouteMap />} />
              <Route path="/routes/:id/forecast" element={<RouteDetail />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/tracking/sos" element={<Sos />} />
              <Route path="/tracking/summary" element={<RunSummary />} />
              <Route path="/tracking/share" element={<ShareStory />} />
              <Route path="/return" element={<Return />} />
              <Route path="/return/verify" element={<VerifyBand />} />
              <Route path="/return/method" element={<RefundMethod />} />
              <Route path="/return/receipt" element={<RefundReceipt />} />
              <Route path="*" element={<Navigate to="/scan" replace />} />
            </Routes>
          </AnimatePresence>
        </main>

        {showNav && <BottomNav />}
      </div>
    </div>
  )
}
