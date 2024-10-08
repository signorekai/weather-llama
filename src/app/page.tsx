'use client';
import type {
	CurrentResponse,
	ThreeHourResponse,
} from 'openweathermap-ts/dist/types';
import { DateTime } from 'luxon';
import { useState, useCallback, useEffect } from 'react';
import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';

import ErrorModal from '@/components/ErrorModal';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';

import WeatherToday from '@/components/WeatherToday';
import { useAppStore } from '@/stores/App';
import { Forecast, SortedForecast } from '@/types/Forecast';
import WeatherForecast from '@/components/WeatherForecast';
import { SkeletonTheme } from 'react-loading-skeleton';
import { getValidLocalDateTime } from './helpers';

countries.registerLocale(english);

export default function Home() {
	const [currentCity, darkMode, setDarkMode] = useAppStore((state) => [
		state.currentCity,
		state.darkMode,
		state.setDarkMode,
	]);

	const [currentWeather, setCurrentWeather] = useState<CurrentResponse | null>(
		null,
	);

	const [forecastWeather, setForecastWeather] = useState<SortedForecast | null>(
		null,
	);

	useEffect(() => {
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (event: any) => {
				setDarkMode(event.matches);
			});

		setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
	}, []);

	const fileForecasts = useCallback(
		({
			data,
			secondsOffset,
		}: {
			data: ThreeHourResponse;
			secondsOffset: number;
		}) => {
			const [today, countryName, IANA] = getValidLocalDateTime({
				countryCode: data.city.country,
				cityName: data.city.name,
				secondsOffset,
			});

			const endOfToday = today.endOf('day');
			const days = [
				today,
				...[1, 2, 3, 4, 5].map((v) => endOfToday.plus({ days: v })),
			];

			const filedForecasts: { [T: string]: Forecast[] } = {};

			data.list.forEach((forecast) => {
				const forecastDate = getValidLocalDateTime({
					countryName,
					cityName: data.city.name,
					secondsOffset,
					DateTimeObj: DateTime.fromSeconds(forecast.dt),
				})[0];

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
						secondsOffset: current.data.timezone,
					});
				} catch (error: any) {
					// console.log(132, error);
					// setError();
				}
			};
			fetchData();
		}
	}, [currentCity, fileForecasts]);

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 200);
	}, [currentCity]);

	const skeletonColours = {
		light: {
			base: '#ebebeb',
			highlight: '#f5f5f5',
		},
		dark: {
			base: '#333',
			highlight: '#454545',
		},
	};

	return (
		<ErrorBoundary FallbackComponent={ErrorModal}>
			<main className="flex flex-1 flex-col items-center justify-between p-4 md:p-8">
				<SkeletonTheme
					highlightColor={
						darkMode
							? skeletonColours.dark.highlight
							: skeletonColours.light.highlight
					}
					baseColor={
						darkMode ? skeletonColours.dark.base : skeletonColours.light.base
					}>
					<WeatherToday
						currentWeather={currentWeather}
						forecastWeather={forecastWeather}
					/>
				</SkeletonTheme>
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
		</ErrorBoundary>
	);
}
