'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/stores/App';
import { useSearchHistoryStore } from '@/stores/SearchHistory';
import { City, CityWithName } from '@/types/City';
import TrashBtn from './TrashBtn';
import debounce from 'lodash.debounce';

function Result({
	city,
	className = '',
	btnClassName = '',
	clickHandler,
	searchTimestamp = 0,
	showButtons = false,
}: Readonly<{
	city: CityWithName;
	className?: string;
	btnClassName?: string;
	clickHandler: () => void;
	searchTimestamp?: number;
	showButtons?: boolean;
}>) {
	const deleteSearchHistory = useSearchHistoryStore((state) => state.delete);

	return (
		<li className={`flex flex-row items-center ${className}`}>
			<button
				tabIndex={0}
				className={`block py-3 flex-1 text-left hover:opacity-50 default-transition ${btnClassName}`}
				onClick={clickHandler}>
				{city.fullName}
			</button>
			{showButtons && (
				<>
					<TrashBtn
						clickHandler={() => {
							deleteSearchHistory(searchTimestamp, city.fullName);
						}}
					/>
				</>
			)}
		</li>
	);
}

export default function Search() {
	const [query, setQuery] = useState('');
	const [isFetching, setIsFetching] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [searchResult, setSearchResult] = useState<CityWithName[]>([]);
	const inputRef = useRef(null);

	const showBackdrop = useAppStore((state) => state.showBackdrop);
	const setShowBackdrop = useAppStore((state) => state.setShowBackdrop);
	const setCurrentCity = useAppStore((state) => state.setCurrentCity);

	const searchHistory = useSearchHistoryStore((state) => state.searchHistory);
	const addSearchHistory = useSearchHistoryStore((state) => state.add);
	const pushSearchHistoryToFront = useSearchHistoryStore((state) => state.push);

	const fetchCity = useCallback(async () => {
		setIsFetching(true);
		const res = await fetch(`/api/geocoding?city=${query}`);
		const { data }: { data: CityWithName[] } = await res.json();
		setSearchResult(data);
		if (data.length === 0) {
			setHasError(true);
		}
		setIsFetching(false);
	}, [query]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetchCity();
	};

	useEffect(() => {
		if (showBackdrop === false) setIsFocused(false);
	}, [showBackdrop]);

	useEffect(() => {
		if (searchHistory.length > 0) {
			setQuery(searchHistory[0].fullName);
			setCurrentCity(searchHistory[0].city);
		}
	}, [searchHistory, setCurrentCity]);

	useEffect(() => {
		useSearchHistoryStore.persist.rehydrate();
		const unsub = useSearchHistoryStore.persist.onFinishHydration(
			({ searchHistory }) => {
				if (searchHistory.length > 0) {
					setQuery(searchHistory[0].fullName);
					pushSearchHistoryToFront(searchHistory[0]);
					setQuery(searchHistory[0].fullName);
					setCurrentCity(searchHistory[0].city);
				} else if ('geolocation' in navigator) {
					// grab device lat/lon
					navigator.geolocation.getCurrentPosition(async (position) => {
						setIsFetching(true);
						const res = await fetch(
							`/api/geocoding?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
						);
						const { data }: { data: CityWithName[] } = await res.json();
						if (data.length > 0) {
							addSearchHistory(data[0]);
							setQuery(data[0].fullName);
							setCurrentCity(data[0]);
						}
						setIsFetching(false);
					});
				}
			},
		);
		return () => {
			unsub();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div
				className=""
				onFocus={() => {
					setShowBackdrop(true);
					setIsFocused(true);
				}}>
				<form className="relative" onSubmit={handleSubmit}>
					<input
						className={`shadow-md outline-offset-1 rounded-lg px-4.5 py-2 lg:px-4 lg:py-1 default-transition hover:px-4.5 hover:py-2 focus:px-4.5 focus:py-2 w-full md:min-w-96 ${
							hasError ? 'input-has-error' : ''
						}`}
						placeholder="Search country or city here..."
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setHasError(false);
						}}
					/>
					<AnimatePresence mode="wait">
						{isFetching && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="w-5 h-5 text-black absolute right-3 top-1/2 -translate-y-1/2">
								<svg
									className="animate-spin opacity-30"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 100 100"
									x="0px"
									y="0px">
									<path
										className="stroke-current"
										strokeWidth="0"
										d="m64,79h13c1.65,0,3-1.35,3-3h0c0-1.66-1.34-3-3-3h-9.21l1.88-1.73c6.31-5.83,9.7-14.08,9.31-22.63-.67-14.53-12.55-26.64-27.05-27.58-8.1-.53-15.82,2.24-21.73,7.79-5.83,5.47-9.18,13.18-9.18,21.15,0,13.49,9.17,25.09,22.3,28.21.9.21,1.83,0,2.56-.57.73-.57,1.14-1.43,1.14-2.36,0-1.39-.96-2.59-2.33-2.92-11.12-2.65-18.52-12.86-17.59-24.28.92-11.28,10.13-20.33,21.44-21.05,6.42-.41,12.53,1.79,17.21,6.19,4.62,4.34,7.27,10.45,7.27,16.76,0,6.86-3.05,13.31-8.36,17.71l-1.64,1.35v-10.07c0-1.65-1.34-3-3-3s-3,1.35-3,3v13c0,3.86,3.14,7,7,7Z"
									/>
								</svg>
							</motion.div>
						)}
					</AnimatePresence>
				</form>
				<AnimatePresence mode="wait">
					{isFocused && (
						<motion.div
							initial={{ opacity: 0, translateY: 40, scale: 0.9 }}
							animate={{ opacity: 1, translateY: 0, scale: 1 }}
							exit={{ opacity: 0, translateY: 40, scale: 0.9 }}
							className="fixed mt-8 left-0 lg:left-auto px-4 w-full lg:px-0 lg:w-auto">
							<AnimatePresence mode="wait">
								{searchHistory.length > 0 && (
									<motion.div key="search-results-history">
										<h6 className="text-blue-light">Previous Searches</h6>
										<div className="bg-white rounded-lg w-full md:min-w-96 py-2">
											<ul className="px-4 max-h-[38dvh] md:max-h-[30dvh] overflow-y-auto divide-y divide-black/15">
												{searchHistory.map(
													({ searchedOn, city, fullName }, index) => (
														<Result
															btnClassName="px-1"
															showButtons={true}
															searchTimestamp={searchedOn}
															city={city}
															clickHandler={debounce(
																() => {
																	setSearchResult([]);
																	setShowBackdrop(false);
																	setQuery(fullName);
																	setCurrentCity(searchHistory[0].city);

																	setTimeout(() => {
																		pushSearchHistoryToFront({
																			searchedOn,
																			city,
																			fullName,
																		});
																	}, 200);
																},
																1000,
																{ leading: true, trailing: false },
															)}
															key={`${city.fullName}-${searchedOn}`}
														/>
													),
												)}
											</ul>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
							<AnimatePresence mode="wait">
								{searchResult.length > 0 && (
									<motion.div
										className="mt-4"
										key="search-results-wrapper"
										initial={{ opacity: 0, translateY: 40 }}
										animate={{ opacity: 1, translateY: 0 }}
										exit={{ opacity: 0, translateY: 40 }}>
										<h6 className="text-blue-light">
											{searchResult.length}{' '}
											{searchResult.length > 1 ? 'cities' : 'city'} found
										</h6>
										<div
											key="search-results"
											className="bg-white rounded-lg w-full md:min-w-96 px-4 py-2 divide-y-2 divide-black/15">
											<ul>
												{searchResult.map((result) => (
													<Result
														btnClassName="px-1"
														city={result}
														clickHandler={debounce(
															() => {
																setSearchResult([]);
																setShowBackdrop(false);
																setQuery(result.fullName);
																setCurrentCity(result);

																setTimeout(() => {
																	addSearchHistory(result);
																}, 200);
															},
															1000,
															{ leading: true, trailing: false },
														)}
														key={`${result.lat},${result.lon}`}
													/>
												))}
											</ul>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
