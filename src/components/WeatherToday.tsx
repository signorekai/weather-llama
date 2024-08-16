'use client';
import type { CurrentResponse } from 'openweathermap-ts/dist/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { Card, List, Row } from '@/components/Card';
import { useAppStore } from '@/stores/App';
import useUnits, { presetUnits } from '@/hooks/units';
import { Forecast } from '@/types/Forecast';
import Temperature from './Temperature';
import Distance from './Distance';

export default function WeatherToday({
	forecastWeather,
	currentWeather,
}: Readonly<{
	forecastWeather: {
		[T: string]: Forecast[];
	} | null;
	currentWeather: CurrentResponse | null;
}>) {
	const [units, currentCity] = useAppStore((state) => [
		state.units,
		state.currentCity,
	]);

	const dt = DateTime.now();

	return (
		<AnimatePresence mode="wait">
			{currentWeather ? (
				<motion.div
					initial={{ opacity: 0, translateX: 40 }}
					animate={{ opacity: 1, translateX: 0 }}
					exit={{ opacity: 0, translateX: -40 }}
					className="lg:max-w-screen-sm w-full"
					key={currentCity?.fullName}>
					<Card className="px-5 pt-4 pb-1">
						<h6 className="mb-0">
							{currentWeather?.timezone ? (
								<>
									{dt
										.setZone(
											`UTC${
												currentWeather.timezone > 0
													? `+${Math.floor(currentWeather.timezone / 3600)}`
													: currentWeather.timezone < 0
													? `${Math.floor(currentWeather.timezone / 3600)}`
													: ''
											}`,
										)
										.toLocaleString(DateTime.DATETIME_FULL)}
								</>
							) : (
								<>
									{dt.setLocale('en-SG').toLocaleString(DateTime.DATETIME_FULL)}
								</>
							)}
						</h6>
						<h3 className="inline-block min-w-52">
							{currentCity?.fullName || <Skeleton />}
						</h3>
						<div className="flex flex-row items-center md:justify-center gap-x-3">
							{currentWeather?.weather[0] ? (
								<>
									<div className="w-[100px] h-[100px]">
										<Image
											unoptimized
											width={100}
											height={100}
											alt={`Current weather: ${currentWeather?.weather[0].description}`}
											src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`}
										/>
									</div>
									<div className="pr-8">
										<h2 className="">
											<Temperature
												units={units}
												value={currentWeather.main.temp}
											/>
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
						<div className="flex flex-row gap-x-2 md:gap-x-3 text-center pt-1">
							<div className="flex-1">
								{currentWeather?.weather[0] ? (
									<>
										<h6 className="mb-0">Humidity</h6>
										<h2 className="responsive">
											{currentWeather.main.humidity}%
										</h2>
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
											<span className="inline-block mr-2 mb-1 invert-100">
												<svg
													className="w-4 h-4"
													style={{
														rotate: `${currentWeather.wind.deg + 180}deg`,
													}}
													xmlns="http://www.w3.org/2000/svg"
													version="1.1"
													viewBox="0 0 24 24">
													<path
														className="dark:fill-white fill-black"
														d="M20.6,16.2l-5.3-12c-.7-1.8-2.8-2.7-4.6-2-.9.4-1.6,1.1-2,2l-5.3,12c-.8,1.8-.3,3.9,1.3,5.1.6.4,1.3.7,2,.7.9,0,1.7-.4,2.4-1l1.9-1.8c.6-.6,1.5-.6,2,0l1.9,1.8c1.2,1.2,3,1.3,4.4.3,1.6-1.2,2.1-3.3,1.3-5.1Z"
													/>
												</svg>
											</span>
											{currentWeather.wind.speed}
											{presetUnits.speed['metric']}
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
											<Distance
												units={units}
												value={currentWeather.visibility}
											/>
										</h2>
									</>
								) : (
									<Skeleton count={2} />
								)}
							</div>
						</div>
						{forecastWeather && Object.keys(forecastWeather).length > 0 ? (
							<div className="mt-4">
								<h6 className="mb-0">Rest of day</h6>
								<List className="!px-0 max-h-none md:max-h-none !overflow-hidden">
									{forecastWeather[Object.keys(forecastWeather)[0]].map(
										(forecast) => (
											<Row
												key={forecast.dt}
												className="flex flex-row gap-x-2 md:gap-x-4 justify-between text-sm md:text-lg leading-tight ">
												<span className="w-max">{forecast.lt}</span>
												<span className="flex-1 flex flex-row items-center justify-center opacity-50">
													<Temperature
														units={units}
														value={forecast.main.temp_min}
													/>{' '}
													/{' '}
													<Temperature
														units={units}
														value={forecast.main.temp_max}
													/>
												</span>
												<span className="opacity-75 w-1/3 flex flex-row items-center justify-end text-right">
													{forecast.weather[0].description}
													<div className="w-12 h-12 md:w-16 md:h-16">
														<Image
															unoptimized
															width={64}
															height={64}
															alt={`Forecast weather at ${forecast.lt}: ${forecast?.weather[0].description}`}
															src={`https://openweathermap.org/img/wn/${forecast?.weather[0].icon}@4x.png`}
														/>
													</div>
												</span>
											</Row>
										),
									)}
									<></>
								</List>
							</div>
						) : (
							<>
								<div className="pb-4"></div>
							</>
						)}
					</Card>
				</motion.div>
			) : (
				<Card className="lg:max-w-screen-sm w-full px-5 pt-4">
					<h6 className="mb-0 max-w-36">
						<Skeleton />
					</h6>
					<h3 className="max-w-32">
						<Skeleton />
					</h3>
					<div className="w-3/4">
						<Skeleton height={48} />
					</div>
					<div className="flex flex-row gap-x-2 mt-2">
						<div className="flex-1 text-4xl">
							<Skeleton />
						</div>
						<div className="flex-1 text-4xl">
							<Skeleton />
						</div>
						<div className="flex-1 text-4xl">
							<Skeleton />
						</div>
					</div>
					<div className="text-3xl">
						<Skeleton count={8} />
					</div>
					<div className="pb-2"></div>
				</Card>
			)}
		</AnimatePresence>
	);
}
