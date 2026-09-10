import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Nfc, ChevronRight } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import { PrimaryButton } from '../components/ui/Button.jsx'
import { Chip } from '../components/ui/Card.jsx'
import { band } from '../data/mock.js'

export default function Scan() {
  const navigate = useNavigate()
  const dragX = useMotionValue(0)
  const rotateY = useSpring(useTransform(dragX, [-64, 0, 64], [-12, 0, 12]), {
    stiffness: 180,
    damping: 18,
  })
  return (
    <PageTransition>
      <div className="min-h-full flex flex-col items-center justify-center px-6 py-10">
        {/* 1 — team-approved watch artwork, centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[320px]"
        >
          <div className="relative mx-auto h-[312px] w-[260px]" style={{ perspective: 900 }}>
            <motion.div
              animate={{ y: [0, -7, 0], rotateX: [0, 1.5, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <motion.img
                src="/watch-cutout.png"
                alt="Black and orange Gulmarg smart ski watch"
                drag="x"
                dragConstraints={{ left: -22, right: 22 }}
                dragElastic={0.12}
                onDrag={(_, info) => dragX.set(info.offset.x)}
                onDragEnd={() => dragX.set(0)}
                style={{ rotateY, transformStyle: 'preserve-3d' }}
                whileTap={{ scale: 0.98 }}
                className="h-[300px] w-[260px] cursor-grab touch-pan-y object-contain drop-shadow-[0_18px_15px_rgba(14,42,71,0.22)] active:cursor-grabbing"
              />
            </motion.div>
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-4 w-36 -translate-x-1/2 rounded-full bg-navy/10 blur-md" />
          </div>
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
