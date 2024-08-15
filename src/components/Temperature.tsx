import useUnits from '@/hooks/units';

export default function Temperature({
	value,
	units = 'metric',
}: Readonly<{
	value: number;
	units?: 'metric' | 'imperial';
}>) {
	let displayValue = value;
	if (units === 'imperial') {
		displayValue = value * 1.8 + 32;
	}

	const { temperature } = useUnits();

	return (
		<span>
			{displayValue}
			<span className="temp-label">{temperature}</span>
		</span>
	);
}
