'use client';
import type { CurrentResponse } from 'openweathermap-ts/dist/types';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { DateTime } from 'luxon';
import Image from 'next/image';

import { Card } from '@/components/Card';
import { useAppStore } from '@/stores/App';
import Temperature from './Temperature';
import useUnits from '@/hooks/units';

export default function WeatherToday() {
	const [units, currentCity] = useAppStore((state) => [
		state.units,
		state.currentCity,
	]);

	const presetUnits = useUnits();

	const [currentWeather, setCurrentWeather] = useState<CurrentResponse | null>(
		null,
	);

	useEffect(() => {
		if (currentCity) {
			const fetchData = async () => {
				const res = await fetch(
					`/api/weather?lat=${currentCity?.lat}&lng=${currentCity?.lon}`,
				);
				const { data }: { data: CurrentResponse } = await res.json();
				setCurrentWeather(data);
				console.log(27, data);
			};
			fetchData();
		}
	}, [currentCity]);

	const dt = DateTime.now();

	return (
		<div className="max-w-screen-md w-full">
			<Card className="px-5 py-4">
				<h6 className="mb-0">
					{currentWeather?.weather ? (
						<>
							{dt
								.setZone(
									`UTC${currentWeather.timezone > 0 ? '+' : '-'}${
										currentWeather.timezone / 3600
									}`,
								)
								.toLocaleString(DateTime.DATETIME_FULL)}
						</>
					) : (
						<>{dt.setLocale('en-SG').toLocaleString(DateTime.DATETIME_FULL)}</>
					)}
				</h6>
				<h3 className="inline-block min-w-52">
					{currentCity?.fullName || <Skeleton />}
				</h3>
				<div className="flex flex-row items-center gap-x-3">
					{currentWeather?.weather[0] ? (
						<>
							<div className="w-[100px] h-[100px]">
								<Image
									unoptimized
									width={100}
									height={100}
									alt={`Current weather: ${currentWeather?.weather[0].description}`}
									src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`}
								/>
							</div>
							<div>
								<h2 className="">
									<Temperature units={units} value={currentWeather.main.temp} />
								</h2>
								<h5>
									<span className="inline-block first-letter:uppercase">
										{currentWeather?.weather[0].description}.
									</span>{' '}
									<>
										<span>Feels like </span>
										<Temperature
											units={units}
											value={currentWeather.main.feels_like}
										/>
									</>
								</h5>
							</div>
						</>
					) : (
						<Skeleton containerClassName="flex-1" height={80}></Skeleton>
					)}
				</div>
				<div className="flex flex-row gap-x-3 text-center pt-1">
					<div className="flex-1">
						{currentWeather?.weather[0] ? (
							<>
								<h6 className="mb-0">Humidity</h6>
								<h2 className="responsive">{currentWeather.main.humidity}%</h2>
							</>
						) : (
							<Skeleton count={2} />
						)}
					</div>
					<div className="flex-grow md:flex-1">
						{currentWeather?.wind ? (
							<>
								<h6 className="mb-0">Winds</h6>
								<h2 className="responsive align-middle">
									<span className="inline-block mr-2 mb-1">
										<img
											src="/images/noun-wind-direction-4669605.svg"
											alt=""
											className="w-4 h-4"
											style={{
												rotate: `${currentWeather.wind.deg + 180}deg`,
											}}
										/>
									</span>
									{currentWeather.wind.speed}
									{presetUnits.speed}
								</h2>
							</>
						) : (
							<Skeleton count={2} />
						)}
					</div>
					<div className="flex-1">
						{currentWeather?.main ? (
							<>
								<h6 className="mb-0">Visibility</h6>
								<h2 className="responsive">
									{currentWeather.visibility > 1000
										? `${Math.floor(currentWeather.visibility / 1000)}k${
												presetUnits.visibility
										  }`
										: `${currentWeather.visibility}${presetUnits.visibility}`}
								</h2>
							</>
						) : (
							<Skeleton count={2} />
						)}
					</div>
				</div>
			</Card>
		</div>
	);
}
