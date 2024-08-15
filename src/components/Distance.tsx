import useUnits from '@/hooks/units';
import { useAppStore } from '@/stores/App';

export default function Distance({
	value,
	units,
}: Readonly<{
	value: number;
	units: 'metric' | 'imperial';
}>) {
	let displayValue = value;
	const { visibility } = useUnits();
	let displayUnit = visibility;

	if (units === 'imperial') {
		displayValue = Math.floor(value * 0.6213712);
	} else {
		if (displayValue > 1000) {
			displayValue = Math.floor(displayValue / 1000);
			displayUnit = `k${displayUnit}`;
		}
	}

	return (
		<span>
			{displayValue}
			{displayUnit}
		</span>
	);
}
