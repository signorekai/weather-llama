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
			add: (entry) =>
				set(() => ({
					searchHistory: [
						{
							fullName: entry.fullName,
							searchedOn: Date.now(),
							city: entry,
						},
						...get().searchHistory,
					],
				})),
			push: (entry) =>
				set(() => {
					return {
						searchHistory: [
							{ ...entry, searchedOn: Date.now() },
							...get().searchHistory.filter(
								(history) => history.searchedOn !== entry.searchedOn,
							),
						],
					};
				}),
			delete: (timestamp, fullName) =>
				set(() => ({
					searchHistory: get().searchHistory.filter(
						(history) =>
							history.searchedOn !== timestamp && history.fullName !== fullName,
					),
				})),
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
