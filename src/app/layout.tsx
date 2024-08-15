import type { Metadata } from 'next';

import '@/styles/globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
	title: 'Weather Llama',
	description: `See the weather near you!`,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={'min-h-screen'}>
				<Header />
				{children}
			</body>
		</html>
	);
}
