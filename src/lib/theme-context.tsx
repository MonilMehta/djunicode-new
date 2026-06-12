'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
    isLight: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'dark',
    toggleTheme: () => {},
    isLight: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        const stored = localStorage.getItem('djunicode-theme') as Theme | null;
        if (stored) setTheme(stored);
    }, []);

    useEffect(() => {
        localStorage.setItem('djunicode-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLight: theme === 'light' }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
