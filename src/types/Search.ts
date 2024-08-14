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
	add: (entry: CityWithName) => void;
	push: (entry: SearchHistory) => void;
	delete: (timestamp: number, fullName: string) => void;
}
