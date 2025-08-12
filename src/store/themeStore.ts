import { create } from "zustand"
import { persist } from "zustand/middleware"


type ThemeState = {
    colorMode: 'light' | 'dark'
    toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            colorMode: 'light',
            toggleTheme: () => 
                set({ colorMode: get().colorMode === 'light' ? 'dark' : 'light' })
        }),
        {
            name: 'theme-storage',
        }
    )
)