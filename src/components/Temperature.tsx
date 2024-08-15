import useUnits from '@/hooks/units';
import { useAppStore } from '@/stores/App';

export default function Temperature({
	value,
	units,
}: Readonly<{
	value: number;
	units: 'metric' | 'imperial';
}>) {
	let displayValue = value;
	if (units === 'imperial') {
		displayValue = value * 1.8 + 32;
	}

	displayValue = Math.round(displayValue * 10) / 10;

	const [setUnits] = useAppStore((state) => [state.setUnits]);
	const { temperature } = useUnits();

	return (
		<span
			onClick={() => {
				setUnits(units === 'metric' ? 'imperial' : 'metric');
			}}>
			{displayValue}
			<span className="temp-label">{temperature}</span>
		</span>
	);
}
