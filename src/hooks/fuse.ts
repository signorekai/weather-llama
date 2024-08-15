import debounce from 'lodash.debounce';

import Fuse, { IFuseOptions } from 'fuse.js';
import { useCallback, useMemo, useState } from 'react';

export default function useFuse<T>({
	list,
	fuseOptions,
}: {
	list: T[];
	fuseOptions: IFuseOptions<T> & { minLength?: number };
}): {
	results: T[];
	setSearchQuery: any;
} {
	const [query, setQuery] = useState('');

	if (fuseOptions.hasOwnProperty('minLength') === false)
		fuseOptions.minLength = 2;

	const debouncedSetQuery = useCallback(
		debounce((t) => {
			setQuery(t);
		}, 100),
		[],
	);

	const fuse = useMemo(() => {
		return new Fuse(list, {
			minMatchCharLength: 2,
			threshold: 0.4,
			...fuseOptions,
		});
	}, [list, fuseOptions]);

	const results = useMemo(() => {
		if (query.length < fuseOptions.minLength!) {
			return list;
		} else {
			const matches = fuse.search(query);
			const processedMatches = matches.map(({ item }) => item);

			if (processedMatches.length === 0) {
				return list;
			}

			return processedMatches;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, list]);

	return {
		setSearchQuery: debouncedSetQuery,
		results,
	};
}
