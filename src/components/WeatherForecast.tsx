'use client';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { Forecast } from '@/types/Forecast';
import { Card, List, Row } from '@/components/Card';
import { useAppStore } from '@/stores/App';
import Temperature from './Temperature';

export default function WeatherForecast({
	forecastWeather,
	className = '',
}: Readonly<{
	forecastWeather: Forecast[] | null;
	className?: string;
}>) {
	const [units, currentCity] = useAppStore((state) => [
		state.units,
		state.currentCity,
	]);

	return (
		<AnimatePresence mode="wait">
			{forecastWeather && (
				<motion.div
					initial={{ opacity: 0, translateX: 40 }}
					animate={{ opacity: 1, translateX: 0 }}
					exit={{ opacity: 0, translateX: -40 }}
					className={`lg:max-w-screen-sm w-full ${className}`}
					key={`${currentCity?.fullName}-${forecastWeather[0].localDate}`}>
					<Card className="px-5 pt-4 pb-1 md:min-w-0">
						<h6 className="mb-0">{forecastWeather[0].localDate}</h6>
						<List className="!px-0 max-h-none md:max-h-none !overflow-hidden">
							{forecastWeather.map((forecast) => (
								<Row
									key={forecast.dt}
									className="flex-row gap-x-2 md:gap-x-4 justify-between text-sm md:text-lg leading-tight py-1">
									<span className="w-max">{forecast.lt}</span>
									<span className="flex-1 flex flex-row items-center justify-center opacity-50">
										<Temperature units={units} value={forecast.main.temp_min} />{' '}
										/{' '}
										<Temperature units={units} value={forecast.main.temp_max} />
									</span>
									<span className="opacity-75 w-1/3 flex flex-row items-center justify-end text-right">
										<span>{forecast.weather[0].description}</span>
										<div className="h-max aspect-square max-w-10 md:max-w-16">
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
							))}
							<></>
						</List>
					</Card>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
