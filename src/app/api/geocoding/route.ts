import type { City, CityWithName } from '@/types/City';
import { type NextRequest } from 'next/server';

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

	console.log(16, cityName, limit, key, lat, lng);

	if (cityName && (!lat || !lng)) {
		const res = await fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${key}`,
		);
		const data = await res.json();
		const processedData = data.map((city: City) => addNameToCity(city));
		return Response.json({ data: processedData });
	} else if (lat && lng) {
		const res = await fetch(
			`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=${limit}&appid=${key}`,
		);
		const data = await res.json();
		const processedData = data.map((city: City) => addNameToCity(city));
		return Response.json({ data: processedData });
	} else {
		return Response.json({});
	}
}
