import { type NextRequest } from 'next/server';

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
		return Response.json({ data });
	} else if (lat && lng) {
		const res = await fetch(
			`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=${limit}&appid=${key}`,
		);
		const data = await res.json();
		return Response.json({ data });
	} else {
		return Response.json({});
	}
}
