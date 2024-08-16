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
	DateTimeObj?: DateTime;
	secondsOffset: number;
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

	const { cityName, countryCode = '', secondsOffset } = params;
	const IANA = `${countryName}/${cityName}`;

	const nowDateTimeObj = params.DateTimeObj
		? params.DateTimeObj
		: DateTime.now();
	let today = nowDateTimeObj.setZone(IANA);

	if (!today.isValid) {
		// IANA not accepted - 'United Kingdom/Newport United Kingdom'
		today = nowDateTimeObj.setZone(countryName);
	}

	if (!today.isValid) {
		// country name not accepted - 'United Kingdom'
		// manually form offset string e.g. "UTC+8"
		const hoursOffset = secondsOffset / 3600;
		let stringOffset = 'UTC';
		if (hoursOffset > 0) {
			stringOffset += `+${hoursOffset}`;
		}

		if (hoursOffset < 0) {
			stringOffset += `${hoursOffset}`;
		}
		today = nowDateTimeObj.setZone(stringOffset);
	}

	if (!today.isValid) {
		console.log(43, today, IANA, countryName);
		throw new Error('Invalid country code / country name and city name!');
	}

	return [today, countryName, IANA];
};
