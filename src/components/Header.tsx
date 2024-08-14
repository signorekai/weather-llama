'use client';
import Modal from './Modal';
import SearchBar from './SearchBar';

export default function Header() {
	return (
		<>
			<Modal />
			<div className="bg-white px-4 py-2 fixed w-full z-50 flex flex-row justify-between items-center shadow-xl">
				<div className="w-12 h-8 md:w-20 md:h-12 overflow-hidden">
					<svg
						className="text-blue-mid w-12 h-12 md:w-20 md:h-20"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 100 100"
						x="0px"
						y="0px">
						<path
							className="fill-current"
							d="M52.18,99.94c-.3-4.41-1.1-14.93-1.1-14.93-13.19-5.76-12.95-24.3-12.95-24.3C35.65,56.63,36,48.56,35.81,46.8s-.72-8.39.24-11.59a33.89,33.89,0,0,0,.8-8.47,14.06,14.06,0,0,0-2.8-.48,2.39,2.39,0,0,1-2-1.28c-5.12-.72-3.84-4.95-2.24-6s5.59-1.44,6-2.8,2.24-2.08,2.24-2.08c-.72-1.12-2.24-6.95-2.24-6.95,1.52-.48,4.8,3,5.76,4.39s1,.64,1,.64l-1-5.67c3.43,1,5.83,7.35,5.83,7.35,3.36,1.52,3.6,3.92,4.24,5.52S53,26.9,53.08,27.78s.79,4.4,1.11,5.83a64.4,64.4,0,0,1,1.2,9.12c-.08,1.75,1.36,6.55,1.36,6.55,13.91-1.6,30.85,2.08,30.85,2.08l12.26,2.15c.08-1.16.14-2.33.14-3.51a50,50,0,1,0-50,50C50.73,100,51.46,100,52.18,99.94Z"
						/>
					</svg>
				</div>
				<div className="max-w-3xl flex-1 lg:flex-none pl-4 lg:pl-0 mx-auto">
					<SearchBar />
				</div>
				<div className="w-12 h-8 md:w-20 md:h-12 hidden lg:block"></div>
			</div>
		</>
	);
}
