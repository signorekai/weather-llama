export default function CloseBtn({
	className = '',
	clickHandler,
}: Readonly<{
	className?: string;
	clickHandler: () => void;
}>) {
	return (
		<button className={`${className}`} onClick={clickHandler}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				xmlSpace="preserve"
				version="1.1"
				x="0px"
				y="0px"
				viewBox="-4.999 0 100 100"
				enable-background="new -4.999 0 99.997 100">
				<path
					className="fill-current"
					d="M70.757,33.593l-9.352-9.348L45,40.649L28.594,24.245l-9.351,9.348l16.406,16.405L19.243,66.404l9.351,9.351  L45,59.35l16.405,16.405l9.352-9.351L54.351,49.998L70.757,33.593z M45,100C17.385,100-4.999,77.613-4.999,49.998  C-4.999,22.387,17.385,0,45,0s49.998,22.387,49.998,49.998C94.998,77.613,72.615,100,45,100z"
				/>
			</svg>
		</button>
	);
}
