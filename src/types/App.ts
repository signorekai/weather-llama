import { type City } from './City';

export interface AppState {
	showBackdrop: boolean | null;
	currentCity: City | null;
}

export interface AppAction {
	setShowBackdrop: (showBackdrop: boolean) => void;
	setCurrentCity: (city: City) => void;
}
