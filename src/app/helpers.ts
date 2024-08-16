import type { City, CityWithName } from '@/types/City';
import { DateTime } from 'luxon';

import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(english);

export const addNameToCity = (city: City): CityWithName => {
	return {
		...city,
		fullName: `${city.name}${
			typeof city.state !== 'undefined' ? `, ${city.state}` : ''
		}, ${city.country}`,
	};
};

interface GetValidLocalDateTimeParamBasic {
	cityName: string;
}

interface GetValidLocalDateTimeParamWithCountryName
	extends GetValidLocalDateTimeParamBasic {
	countryName: string;
	countryCode?: never;
}

interface GetValidLocalDateTimeParamWithCountryCode
	extends GetValidLocalDateTimeParamBasic {
	countryCode: string;
	countryName?: never;
}

type GetValidLocalDateTimeParam =
	| GetValidLocalDateTimeParamWithCountryCode
	| GetValidLocalDateTimeParamWithCountryName;

export const getValidLocalDateTime = (
	params: GetValidLocalDateTimeParam,
): [DateTime, countryName: string, IANA: string] => {
	const countryName = params.countryName
		? params.countryName
		: countries.getName(params.countryCode!, 'en') || '';

	const { cityName, countryCode = '' } = params;

	const IANA = `${countryName}/${cityName}`;

	let today = DateTime.now().setZone(IANA);
	if (!today.isValid) {
		today = DateTime.now().setZone(countryName);
	}

	if (!today.isValid) {
		today = DateTime.now().setZone(countryCode);
	}

	if (!today.isValid) {
		console.log(43, today, IANA, countryName);
		throw new Error('Invalid country code / country name and city name!');
	}

	return [today, countryName, IANA];
};
