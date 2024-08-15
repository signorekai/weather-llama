import debounce from 'lodash.debounce';

import Fuse, { IFuseOptions } from 'fuse.js';
import { useCallback, useMemo, useState } from 'react';

export default function useFuse<T>({
	list,
	fuseOptions,
}: {
	list: T[];
	fuseOptions: IFuseOptions<T>;
}): {
	results: T[];
	setSearchQuery: any;
} {
	const [query, setQuery] = useState('');

	const debouncedSetQuery = useCallback(
		debounce((t) => setQuery(t), 200),
		[],
	);

	// useEffect(() => {
	// 	debouncedSetQuery(searchTerm);
	// }, [debouncedSetQuery, searchTerm]);

	const fuse = useMemo(() => {
		return new Fuse(list, {
			minMatchCharLength: 2,
			...fuseOptions,
		});
	}, [list, fuseOptions]);

	const results = useMemo(() => {
		console.log(37);
		return fuse.search(query);
	}, [fuse, query]);

	const processedResults = results.map(({ item }) => item);

	if (processedResults.length > 0) {
		return { results: processedResults, setSearchQuery: debouncedSetQuery };
	} else {
		return { results: list, setSearchQuery: debouncedSetQuery };
	}
}
