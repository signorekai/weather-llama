import type { UnitType, UnitsInUse } from '@/types/Units';
import { useAppStore } from '@/stores/App';

export const presetUnits: { [m in UnitsInUse]: { [k in UnitType]: string } } = {
	speed: {
		metric: 'm/s',
		imperial: 'mi/h',
	},
	visibility: {
		metric: 'm',
		imperial: 'mi',
	},
	temperature: {
		metric: '°C',
		imperial: '°F',
	},
};

export default function useUnits() {
	const [units] = useAppStore((state) => [state.units]);

	const toReturn: { [m in UnitsInUse]: string } = {
		speed: presetUnits.speed[units],
		visibility: presetUnits.visibility[units],
		temperature: presetUnits.temperature[units],
	};

	return toReturn;
}
