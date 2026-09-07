import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Nfc, ChevronRight } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import { PrimaryButton } from '../components/ui/Button.jsx'
import { Chip } from '../components/ui/Card.jsx'
import Watch3D from '../components/Watch3D.jsx'
import { band } from '../data/mock.js'

export default function Scan() {
  const navigate = useNavigate()
  return (
    <PageTransition>
      <div className="min-h-full flex flex-col items-center justify-center px-6 py-10">
        {/* 1 — 3D watch, centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[320px]"
        >
          <Watch3D height={300} />
        </motion.div>

        {/* 2 — band code */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-2"
        >
          <Chip tone="glacier" className="!h-9 !px-4 !text-[13px]">
            <Nfc size={15} /> Band #{band.id}
          </Chip>
        </motion.div>

        {/* 3 — activate button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-10 w-full max-w-[320px]"
        >
          <PrimaryButton onClick={() => navigate('/activating')}>
            Activate Band <ChevronRight size={18} />
          </PrimaryButton>
        </motion.div>
      </div>
    </PageTransition>
  )
}
