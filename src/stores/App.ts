import { AppState, AppAction } from '@/types/App';
import { create } from 'zustand';

export const useAppStore = create<AppState & AppAction>()((set) => ({
	showBackdrop: false,
	setShowBackdrop: (showBackdrop) =>
		set(() => ({ showBackdrop: showBackdrop })),
	currentCity: null,
	setCurrentCity: (city) => set(() => ({ currentCity: city })),
}));
