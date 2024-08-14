import { type CityWithName } from './City';

export interface SearchHistory {
	fullName: string;
	searchedOn: number;
	city: CityWithName;
}

export interface SearchHistoryState {
	searchHistory: SearchHistory[];
}

export interface SearchHistoryAction {
	add: (city: CityWithName) => void;
	push: (searchHistory: SearchHistory) => void;
}
