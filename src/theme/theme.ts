// src/theme/theme.ts
import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
      colors: {
        brand: {
          50:  {value: '#ffe5f7'},
          100: {value: '#fbb8eb'},
          200: {value: '#f48edd'},
          300: {value: '#ed63cf'},
          400: {value: '#e739c2'},
          500: {value: '#ce20a8'}, // base
          600: {value: '#a21784'},
          700: {value: '#770f60'},
          800: {value: '#4d073c'},
          900: {value: '#260319'},
        },
        background: {
          light: {value: '#f7f4fb'},
          dark: {value: '#1a1a2e'},
        },
      },
      breakpoints: {
        sm: { value: '30em' },   // 480px
        md: { value: '48em' },   // 768px
        lg: { value: '62em' },   // 992px
        xl: { value: '80em' },   // 1280px
        '2xl': { value: '96em' } // 1536px
      },
      
    },
    semanticTokens: {
      colors: {
        text: {
          value: { base: '#111' ,_dark: '#fff' },
        },
        bg: {
          value : { base: "{colors.background.light}" ,_dark : "{colors.background.dark}" },
        },
        buttonBg: {
          value: { base: "{colors.brand.500}", _dark: "{colors.background.dark}"}
        },
        hoverMenu:{
          value: { base: "{colors.background.light}" ,_dark : "{colors.background.dark}" }
        },

        hoverText:{
          value: { base: "{colors.brand.500}" ,_dark : "{colors.background.light}" }
        }
      },
    },
  },
})


