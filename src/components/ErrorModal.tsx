'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Card } from './Card';

export default function ErrorModal({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) {
	return (
		<div className="mt-4 lg:max-w-screen-sm w-full mx-auto px-4">
			<AnimatePresence>
				{error && (
					<motion.div
						key="error-container"
						initial={{ opacity: 0, translateY: 40, scale: 0.9 }}
						animate={{ opacity: 1, translateY: 0, scale: 1 }}
						exit={{ opacity: 0, translateY: 40, scale: 0.9 }}>
						<Card className="px-4 py-4 text-center">{error.message}</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
