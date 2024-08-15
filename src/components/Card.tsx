export const Card = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<div className="bg-white rounded-lg w-full md:min-w-96 py-2">{children}</div>
);

export const List = ({
	children,
	className = '',
}: Readonly<{ children: React.ReactNode; className?: string }>) => (
	<ul
		className={`px-4 max-h-[38dvh] md:max-h-[30dvh] overflow-y-auto divide-y divide-black/15 ${className}`}>
		{children}
	</ul>
);

export const Row = ({
	children,
	className = '',
}: Readonly<{ children: React.ReactNode; className?: string }>) => (
	<li className={`flex flex-row items-center ${className}`}>{children}</li>
);
