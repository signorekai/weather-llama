import { useRef, useState } from 'react';

export default function Search() {
	const [query, setQuery] = useState('');
	const inputRef = useRef(null);

	return (
		<>
			<form>
				<input ref={inputRef} type="text" value={query} />
			</form>
		</>
	);
}
