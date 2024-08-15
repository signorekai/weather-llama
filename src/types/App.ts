import type { CityWithName } from './City';
import type { UnitType } from './Units';

export interface AppState {
	showBackdrop: boolean | null;
	units: UnitType;
	currentCity: CityWithName | null;
}

export interface AppAction {
	setShowBackdrop: (showBackdrop: boolean) => void;
	setCurrentCity: (city: CityWithName) => void;
	setUnits: (unit: UnitType) => void;
}
