import type { City, CityWithName } from '@/types/City';

export const addNameToCity = (city: City): CityWithName => {
	return {
		...city,
		fullName: `${city.name}${
			typeof city.state !== 'undefined' ? `, ${city.state}` : ''
		}, ${city.country}`,
	};
};
