import { type AppState } from '@/types/App';
import { AnimatePresence, motion } from 'framer-motion';
import { create } from 'zustand';

export const useAppStore = create<AppState>()((set) => ({
	showBackdrop: false,
	setShowBackdrop: (showBackdrop) =>
		set((state) => ({ ...state, showBackdrop })),
}));

export default function Modal() {
	const showBackdrop = useAppStore((state) => state.showBackdrop);
	const setShowBackdrop = useAppStore((state) => state.setShowBackdrop);

	return (
		<AnimatePresence>
			{showBackdrop && (
				<motion.div
					key="backdrop"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => {
						setShowBackdrop(false);
					}}
					className="fixed w-screen h-screen top-0 left-0 z-30 bg-black/40 backdrop-blur-sm"></motion.div>
			)}
		</AnimatePresence>
	);
}
