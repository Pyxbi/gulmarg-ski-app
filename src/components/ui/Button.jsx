import { motion } from 'framer-motion'

export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`btn-primary ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export function SecondaryButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`btn-secondary ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
