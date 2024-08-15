import { type NextRequest } from 'next/server';
import type { City, CityWithName } from '@/types/City';

export const addNameToCity = (city: City): CityWithName => {
	return {
		...city,
		fullName: `${city.name}${
			typeof city.state !== 'undefined' ? `, ${city.state}` : ''
		}, ${city.country}`,
	};
};

export async function GET(request: NextRequest) {
	const limit = 10;
	const key = process.env.OPEN_WEATHER_KEY || '';

	const { searchParams } = request.nextUrl;
	const cityName = searchParams.get('city');
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	let url = '';

	if (cityName && (!lat || !lng)) {
		url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${key}`;
	} else if (lat && lng) {
		url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=${limit}&appid=${key}`;
	}

	if (url.length === 0) {
		return Response.json({});
	} else {
		const res = await fetch(url);
		const data = await res.json();
		const processedData = data.map((city: City) => addNameToCity(city));
		return Response.json({ data: processedData });
	}
}
