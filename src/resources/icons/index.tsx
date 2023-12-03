/* eslint-disable max-len */
import React from 'react';

export type IconNames = 'marine-farming' | 'agro-industry' | 'municipality' | 'map' | 'tables' | 'diagram'

export const icons: Record<IconNames, React.ReactNode> = {
	'marine-farming': (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M13.001 3v1h-2V3h2Zm-1 7.11 5.38 1.77 2.39.78-1.12 3.97c-.54-.3-.94-.71-1.14-.94l-1.51-1.73-1.51 1.72c-.34.4-1.28 1.32-2.49 1.32-1.21 0-2.15-.92-2.49-1.32l-1.51-1.72-1.51 1.72c-.2.23-.6.63-1.14.93l-1.13-3.96 2.4-.79 5.38-1.75Zm3-9.11h-6v3h-3c-1.1 0-2 .9-2 2v4.62l-1.29.42a1.007 1.007 0 0 0-.66 1.28l1.9 6.68h.05c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78a.997.997 0 0 0-.6-.5l-1.28-.42V6c0-1.1-.9-2-2-2h-3V1Zm-9 8.97V6h12v3.97l-6-1.97-6 1.97Zm10 9.71a6.985 6.985 0 0 1-4 1.28c-1.39 0-2.78-.43-4-1.28-1.22.85-2.61 1.32-4 1.32h-2v2h2c1.38 0 2.74-.35 4-.99 1.26.64 2.63.97 4 .97s2.74-.32 4-.97c1.26.65 2.62.99 4 .99h2v-2h-2c-1.39 0-2.78-.47-4-1.32Z"
				fill="currentColor"
			/>
		</svg>
	),
	'agro-industry': (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M12.87 13.06A2.5 2.5 0 0 1 15 9.25h1c1.51 0 2-1 2-1s.55 6-3 6c-.49 0-.94-.14-1.32-.38-.24.64-.59 1.76-.76 2.96 1.26.22 2.28.89 2.77 1.77a6.505 6.505 0 0 0 2.81-5.35h3c0 5.24-4.26 9.5-9.5 9.5s-9.5-4.26-9.5-9.5 4.26-9.5 9.5-9.5v-2.5l4 4-4 4v-2.5c-3.58 0-6.5 2.92-6.5 6.5 0 2.21 1.11 4.17 2.81 5.35.51-.92 1.63-1.62 2.98-1.8-.09-.69-.26-1.42-.49-2.03-.35.3-.8.48-1.3.48-1.1 0-2-.9-2-2v-.99c0-.56-.19-1.09-.5-1.51 0 0 4.45-.23 4.5 2.5 0 .29-.06.56-.17.8-.42-.32-.86-.6-1.33-.8.58.43 1.37 1.37 2 2.6.67-1.62 1.68-3.27 3-4.6-.76.52-1.47 1.12-2.13 1.81Z"
				fill="currentColor"
			/>
		</svg>

	),
	municipality: (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M12 7V3H2v18h20V7H12ZM6 19H4v-2h2v2Zm0-4H4v-2h2v2Zm0-4H4V9h2v2Zm0-4H4V5h2v2Zm4 12H8v-2h2v2Zm0-4H8v-2h2v2Zm0-4H8V9h2v2Zm0-4H8V5h2v2Zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10Zm-2-8h-2v2h2v-2Zm0 4h-2v2h2v-2Z"
				fill="currentColor"
			/>
		</svg>
	),
	map: (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="m20.5 3-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5ZM10 5.47l4 1.4v11.66l-4-1.4V5.47Zm-5 .99 3-1.01v11.7l-3 1.16V6.46Zm14 11.08-3 1.01V6.86l3-1.16v11.84Z"
				fill="currentColor"
			/>
		</svg>
	),
	tables: (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path fillRule="evenodd" clipRule="evenodd" d="M3.75 7.5h16.5c.45 0 .75-.3.75-.75V6c0-1.65-1.35-3-3-3H6C4.35 3 3 4.35 3 6v.75c0 .45.3.75.75.75Z" fill="currentColor" />
			<path fillRule="evenodd" clipRule="evenodd" d="M18 21H6c-1.65 0-3-1.35-3-3V6.75c0-.45.3-.75.75-.75h16.5c.45 0 .75.3.75.75V18c0 1.65-1.35 3-3 3Zm1.5-4.5V18c0 .825-.675 1.5-1.5 1.5H9v-3h10.5Zm0-1.5H9v-3h10.5v3Zm0-4.5H9v-3h10.5v3Zm-12 0v-3h-3v3h3Zm-3 1.5v3h3v-3h-3Zm3 4.5h-3V18c0 .825.675 1.5 1.5 1.5h1.5v-3Z" fill="currentColor" />
		</svg>
	),
	diagram: (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M8.25 17.625h-3a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75ZM6 16.125h1.5v-3H6v3Zm12.75 1.5h-3a.75.75 0 0 1-.75-.75v-12a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75Zm-2.25-1.5H18v-10.5h-1.5v10.5Zm-3 1.5h-3a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Zm-2.25-1.5h1.5v-7.5h-1.5v7.5Zm7.5 3.75H5.25a.75.75 0 1 1 0-1.5h13.5a.75.75 0 1 1 0 1.5Z"
				fill="currentColor"
			/>
		</svg>
	),
};

export default icons;
