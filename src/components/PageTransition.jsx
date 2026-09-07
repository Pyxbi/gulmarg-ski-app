import { motion } from 'framer-motion'

// Shared page transition: gentle fade + slide + settle.
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`h-full ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Staggered list container + item, reused across screens.
export const listContainer = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}
export const listItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
}
