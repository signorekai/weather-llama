'use client';
import {
	CurrentResponse,
	ThreeHourResponse,
} from 'openweathermap-ts/dist/types';
import { DateTime } from 'luxon';
import { useState, useCallback, useEffect } from 'react';

import WeatherToday from '@/components/WeatherToday';
import { useAppStore } from '@/stores/App';
import { Forecast, SortedForecast } from '@/types/Forecast';
import WeatherForecast from '@/components/WeatherForecast';

export default function Home() {
	const [currentCity] = useAppStore((state) => [state.currentCity]);

	const [currentWeather, setCurrentWeather] = useState<CurrentResponse | null>(
		null,
	);

	const [forecastWeather, setForecastWeather] = useState<SortedForecast | null>(
		null,
	);

	const fileForecasts = useCallback(
		({ data, timezone }: { data: ThreeHourResponse; timezone: number }) => {
			const stringTimeZone = `UTC${
				timezone > 0
					? `+${timezone / 3600}`
					: timezone < 0
					? `${timezone / 3600}`
					: ''
			}`;

			const today = DateTime.now().setZone(stringTimeZone);
			today.endOf('day');
			const days = [
				today,
				...[1, 2, 3, 4, 5].map((v) => today.plus({ days: v })),
			];

			const filedForecasts: { [T: string]: Forecast[] } = {};

			data.list.forEach((forecast) => {
				const forecastDate = DateTime.fromSeconds(forecast.dt).setZone(
					stringTimeZone,
				);
				days.every((day) => {
					const isSameDay = forecastDate.hasSame(day, 'day');
					if (isSameDay) {
						const date = day.toISODate();
						if (date) {
							if (filedForecasts.hasOwnProperty(date) === false) {
								filedForecasts[date] = [];
							}
							filedForecasts[date].push({
								lt: forecastDate.toLocaleString(DateTime.TIME_24_SIMPLE),
								localDate: forecastDate.toLocaleString(
									DateTime.DATE_MED_WITH_WEEKDAY,
								),
								...forecast,
							});
							return false;
						} else {
							return true;
						}
					}

					return true;
				});
			});

			setForecastWeather(filedForecasts);
		},
		[],
	);

	useEffect(() => {
		if (currentCity) {
			const fetchData = async () => {
				try {
					const currentRes = await fetch(
						`/api/weather/current?lat=${currentCity?.lat}&lng=${currentCity?.lon}`,
					);
					const current: { data: CurrentResponse } = await currentRes.json();
					setCurrentWeather(current.data);

					const forecastRes = await fetch(
						`/api/weather/forecast?lat=${currentCity?.lat}&lng=${currentCity?.lon}`,
					);
					const forecast: { data: ThreeHourResponse } =
						await forecastRes.json();
					fileForecasts({
						data: forecast.data,
						timezone: current.data.timezone,
					});
				} catch (error) {}
			};
			fetchData();
		}
	}, [currentCity, fileForecasts]);

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 200);
	}, [currentCity]);

	return (
		<main className="flex flex-1 flex-col items-center justify-between p-4 md:p-8">
			<WeatherToday
				currentWeather={currentWeather}
				forecastWeather={forecastWeather}
			/>
			{forecastWeather && (
				<div className="grid grid-cols-1 gap-x-2 gap-y-2 mt-2 items-center w-full max-w-screen-lg mx-auto">
					{Object.keys(forecastWeather)
						.slice(1)
						.filter((k) => forecastWeather[k].length > 0)
						.map((k) => (
							<WeatherForecast
								className="mx-auto"
								key={k}
								forecastWeather={forecastWeather[k]}
							/>
						))}
				</div>
			)}
			<div className="mt-6 text-xs credits">
				<h6 className="mb-0">Image credits</h6>
				<ul className="opacity-35">
					<li>
						Llama by havid ika from{' '}
						<a
							href="https://thenounproject.com/icon/llama-4171316/"
							target="_blank"
							rel="noopener noreferrer"
							title="Llama Icons">
							Noun Project
						</a>{' '}
						(CC BY 3.0)
					</li>
					<li>
						spinner by Zach Bogart from{' '}
						<a
							href="https://thenounproject.com/icon/spinner-3644820/"
							target="_blank"
							rel="noopener noreferrer"
							title="spinner Icons">
							Noun Project
						</a>{' '}
						(CC BY 3.0)
					</li>
					<li>
						Trash by Sebastiaan van Veen from{' '}
						<a
							href="https://thenounproject.com/browse/icons/term/trash/"
							target="_blank"
							rel="noopener noreferrer"
							title="Trash Icons">
							Noun Project
						</a>{' '}
						(CC BY 3.0)
					</li>
					<li>
						wind direction by Komardews from{' '}
						<a
							href="https://thenounproject.com/browse/icons/term/wind-direction/"
							target="_blank"
							rel="noopener noreferrer"
							title="wind direction Icons">
							Noun Project
						</a>{' '}
						(CC BY 3.0)
					</li>
				</ul>
			</div>
		</main>
	);
}
