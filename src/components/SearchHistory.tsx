import debounce from 'lodash.debounce';

import type { SearchHistory } from '@/types/Search';
import { useSearchHistoryStore } from '@/stores/SearchHistory';
import { useAppStore } from '@/stores/App';
import { Card, List, Row } from './Card';
import TrashBtn from './TrashBtn';
import { CityWithName } from '@/types/City';

export default function SearchHistory({
	searchHistory,
	setSearchResult,
	setShowBackdrop,
	setQuery,
	setHasError,
}: Readonly<{
	searchHistory: SearchHistory[];
	setSearchResult: React.Dispatch<React.SetStateAction<CityWithName[]>>;
	setShowBackdrop: (showBackdrop: boolean) => void;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	setHasError: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
	const unshiftSearchHistory = useSearchHistoryStore((state) => state.push);
	const deleteSearchHistory = useSearchHistoryStore((state) => state.delete);

	const setCurrentCity = useAppStore((state) => state.setCurrentCity);

	return (
		<Card>
			<List>
				{searchHistory.map(({ searchedOn, city, fullName }, index) => (
					<Row key={`${index}-${city.fullName}-${searchedOn}`}>
						<button
							tabIndex={0}
							className={`block py-3 flex-1 text-left hover:opacity-50 default-transition px-1`}
							onClick={debounce(
								() => {
									setSearchResult([]);
									setShowBackdrop(false);
									setQuery(fullName);
									setCurrentCity(searchHistory[0].city);
									setHasError(false);
									setTimeout(() => {
										unshiftSearchHistory({
											searchedOn,
											city,
											fullName,
										});
									}, 200);
								},
								1000,
								{ leading: true, trailing: false },
							)}>
							{fullName}
						</button>
						<TrashBtn
							clickHandler={() => {
								deleteSearchHistory(searchedOn, fullName);
							}}
						/>
					</Row>
				))}
			</List>
		</Card>
	);
}
