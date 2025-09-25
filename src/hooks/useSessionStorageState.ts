import { useState, useEffect } from 'react';

function useSessionStorageState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [state, setState] = useState<T>(() => {
		try {
			const storedValue = window.sessionStorage.getItem(key);
			return storedValue ? JSON.parse(storedValue) : defaultValue;
		} catch (error) {
			console.error('Error reading from sessionStorage:', error);
			return defaultValue;
		}
	});

	useEffect(() => {
		try {
			window.sessionStorage.setItem(key, JSON.stringify(state));
		} catch (error) {
			console.error('Error writing to sessionStorage:', error);
		}
	}, [key, state]);

	return [state, setState];
}

export default useSessionStorageState;
