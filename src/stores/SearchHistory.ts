import { addNameToCity } from '@/app/api/geocoding/route';
import type {
	SearchHistory,
	SearchHistoryAction,
	SearchHistoryState,
} from '@/types/Search';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSearchHistoryStore = create<
	SearchHistoryState & SearchHistoryAction
>()(
	persist(
		(set, get) => ({
			searchHistory: [],
			add: (city) =>
				set(() => ({
					searchHistory: [
						{
							fullName: city.fullName,
							searchedOn: Date.now(),
							city,
						},
						...get().searchHistory,
					],
				})),
			push: (newHistory) =>
				set(() => {
					console.log(get().searchHistory, newHistory);
					return {
						searchHistory: [
							{ ...newHistory, searchedOn: Date.now() },
							...get().searchHistory.filter(
								(history) => history.searchedOn !== newHistory.searchedOn,
							),
						],
					};
				}),
		}),
		{
			name: 'search-history',
			skipHydration: true,
			version: 1,
			migrate(persistedState: any, version) {
				if (version === 0) {
					persistedState.searchHistory = persistedState.searchHistory.map(
						(history: SearchHistory) => ({
							...history,
							fullName: addNameToCity(history.city),
						}),
					);

					return persistedState;
				}
			},
		},
	),
);
