import Image from 'next/image';
import WeatherToday from '@/components/WeatherToday';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
			<WeatherToday />
		</main>
	);
}
