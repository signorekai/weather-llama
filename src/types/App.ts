import type { CityWithName } from './City';
import type { UnitType } from './Units';

export interface AppState {
	showBackdrop: boolean | null;
	darkMode: boolean;
	units: UnitType;
	currentCity: CityWithName | null;
}

export interface AppAction {
	setShowBackdrop: (showBackdrop: boolean) => void;
	setDarkMode: (darkMode?: boolean) => void;
	setCurrentCity: (city: CityWithName) => void;
	setUnits: (unit: UnitType) => void;
}
