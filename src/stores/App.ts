import { AppState, AppAction } from '@/types/App';
import { create } from 'zustand';

export const useAppStore = create<AppState & AppAction>()((set) => ({
	showBackdrop: false,
	darkMode: false,
	currentCity: null,
	units: 'metric',
	setDarkMode: (darkMode) => set((state) => ({ darkMode })),
	setShowBackdrop: (showBackdrop) => set(() => ({ showBackdrop })),
	setCurrentCity: (city) => set(() => ({ currentCity: city })),
	setUnits: (units) => set(() => ({ units })),
}));
