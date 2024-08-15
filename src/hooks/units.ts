import type { UnitType, UnitsInUse } from '@/types/Units';
import { useAppStore } from '@/stores/App';

export default function useUnits() {
	const [units] = useAppStore((state) => [state.units]);

	const presetUnits: { [m in UnitsInUse]: { [k in UnitType]: string } } = {
		speed: {
			metric: 'm/s',
			imperial: 'mi/h',
		},
		visibility: {
			metric: 'm',
			imperial: 'm',
		},
		temperature: {
			metric: '°C',
			imperial: '°F',
		},
	};

	const toReturn: { [m in UnitsInUse]: string } = {
		speed: presetUnits.speed[units],
		visibility: presetUnits.visibility[units],
		temperature: presetUnits.temperature[units],
	};

	return toReturn;
}
