'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useState } from 'react';

export type BackdropContextType = {
	showBackdrop: boolean | null;
	setShowBackdrop: (showBackdrop: boolean) => void;
};

export const BackdropContext = createContext<BackdropContextType | null>(null);

export default function BackdropProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [showBackdrop, setShowBackdrop] = useState<boolean | null>(null);

	return (
		<BackdropContext.Provider value={{ showBackdrop, setShowBackdrop }}>
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
			{children}
		</BackdropContext.Provider>
	);
}
