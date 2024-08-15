export const Card = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<div className="bg-white rounded-lg w-full md:min-w-96 py-2">
		<ul className="px-4 max-h-[38dvh] md:max-h-[30dvh] overflow-y-auto divide-y divide-black/15">
			{children}
		</ul>
	</div>
);

export const Row = ({
	children,
	className = '',
}: Readonly<{ children: React.ReactNode; className?: string }>) => (
	<li className={`flex flex-row items-center ${className}`}>{children}</li>
);
