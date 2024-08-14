export default function TrashBtn({
	className = '',
	clickHandler,
}: Readonly<{
	className?: string;
	clickHandler: () => void;
}>) {
	return (
		<button
			className={`w-10 h-10 p-2 text-black/30 rounded-full bg-blue-mid/10 hover:bg-blue-mid hover:text-white default-transition ${className}`}
			onClick={clickHandler}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				viewBox="0 0 100 100">
				<path
					className="fill-current"
					d="M40.6,11.9c-3.5,0-6.2,2.8-6.2,6.2v9.4H15.6c-1.7,0-3.1,1.4-3.1,3.1s1.4,3.1,3.1,3.1h7l5.4,47.9c.5,4.7,4.5,8.3,9.3,8.3h25.4c4.8,0,8.8-3.6,9.3-8.3l5.4-47.9h7c1.7,0,3.1-1.4,3.1-3.1s-1.4-3.1-3.1-3.1h-18.8v-9.4c0-3.5-2.8-6.2-6.2-6.2h-18.8ZM59.4,27.5v-9.4h-18.8v9.4h18.8ZM28.9,33.8h42.3l-5.3,47.2c-.2,1.6-1.5,2.8-3.1,2.8h-25.4c-1.6,0-2.9-1.2-3.1-2.8l-5.3-47.2Z"
				/>
			</svg>
		</button>
	);
}
