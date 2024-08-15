import { type NextRequest } from 'next/server';
import OpenWeatherMap from 'openweathermap-ts';
import type { City, CityWithName } from '@/types/City';

export async function GET(request: NextRequest) {
	const limit = 10;
	const key = process.env.OPEN_WEATHER_KEY || '';

	const openWeather = new OpenWeatherMap({
		apiKey: key,
		units: 'metric',
	});

	const { searchParams } = request.nextUrl;
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	if (!lat || !lng) {
		return Response.json(
			{ error: 'Need latitude and longitude' },
			{ status: 500 },
		);
	} else {
		try {
			const data = await openWeather.getThreeHourForecastByGeoCoordinates(
				parseFloat(lat),
				parseFloat(lng),
			);
			return Response.json({ data });
		} catch (error) {
			console.log(27, error);
			return Response.error();
		}
	}
}
