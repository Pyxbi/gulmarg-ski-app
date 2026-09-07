/** @type {import('tailwindcss').Config} */
// Alpine Frost design tokens. Keep colors in sync with CLAUDE.md.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand
        glacier: {
          DEFAULT: '#3B9CE0', // Glacier Sky Blue — primary actions
          dark: '#2B88CB',
          deep: '#247AB8', // pressed
        },
        ice: '#BFE0F5', // Crystalline Ice — active/secondary accents
        frost: '#EAF4FB', // Frosted Powder — soft fills
        navy: '#0E2A47', // Deep Crevasse Navy — text/headlines
        // Surfaces
        canvas: '#FFFFFF',
        glacierwhite: '#F7FAFC',
        // Support
        perimeter: '#E2E8F0', // frosted border
        slope: '#94A3B8', // secondary metadata grey
        // Status
        danger: '#E11D48', // avalanche / SOS / red dot
        safe: '#10B981', // open trail / synced / green dot
        caution: '#F59E0B', // amber — "not recommended" / caution
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem', // 16px standard cards
        hero: '1.25rem', // 20px hero widgets
      },
      boxShadow: {
        frost: '0 8px 32px -4px rgba(14, 42, 71, 0.06)',
        float: '0 12px 36px -6px rgba(14, 42, 71, 0.10), 0 4px 12px -2px rgba(59, 156, 224, 0.08)',
        modal: '0 20px 48px -8px rgba(14, 42, 71, 0.16)',
        glow: '0 4px 14px rgba(59, 156, 224, 0.35)',
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
