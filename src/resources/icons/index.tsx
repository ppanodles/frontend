/* eslint-disable max-len */
import React from 'react';

export type IconNames = 'marine-farming'
	| 'agro-industry'
	| 'municipality'
	| 'map'
	| 'tables'
	| 'diagram'
	| 'near-me'
	| 'heat'
	| 'water-ec'
	| 'visibility-on'
	| 'visibility-off'
	| 'items'
	| 'filters'
	| 'calendar'
	| 'clock'
	| 'marker'

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
	'near-me': (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="m17.27 6.73-4.24 10.13-1.64-4.25-.82-.32-3.43-1.33 10.13-4.23ZM21 3 3 10.53v.98l6.84 2.65L12.48 21h.98L21 3Z"
				fill="currentColor"
			/>
		</svg>
	),
	heat: (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M13.3 20.725c-.1.083-.204.15-.313.2a.855.855 0 0 1-.362.075.991.991 0 0 1-.4-.087 1.13 1.13 0 0 1-.35-.238c-.683-.733-1.188-1.483-1.512-2.25A6.15 6.15 0 0 1 9.875 16c0-.617.092-1.267.275-1.95.183-.683.5-1.567.95-2.65.383-.95.65-1.68.8-2.188.15-.508.225-.979.225-1.412 0-.567-.125-1.096-.375-1.587-.25-.492-.642-.988-1.175-1.488-.1-.1-.18-.217-.237-.35a.991.991 0 0 1-.088-.4.86.86 0 0 1 .075-.363c.05-.108.117-.212.2-.312a1.033 1.033 0 0 1 .725-.3c.133 0 .258.025.375.075.117.05.225.117.325.2.733.683 1.28 1.4 1.638 2.15.358.75.537 1.542.537 2.375 0 .583-.088 1.196-.262 1.837-.175.642-.48 1.48-.913 2.513-.417 1-.7 1.767-.85 2.3a5.634 5.634 0 0 0-.225 1.525c0 .583.12 1.146.363 1.688.241.541.612 1.087 1.112 1.637.083.1.15.208.2.325.05.117.075.242.075.375s-.025.262-.075.387a.87.87 0 0 1-.25.338Zm4.875 0c-.1.083-.204.15-.313.2A.855.855 0 0 1 17.5 21a.991.991 0 0 1-.4-.087 1.13 1.13 0 0 1-.35-.238c-.683-.733-1.188-1.48-1.512-2.238a6.06 6.06 0 0 1-.488-2.412c0-.617.092-1.275.275-1.975.183-.7.5-1.583.95-2.65.383-.95.65-1.675.8-2.175.15-.5.225-.967.225-1.4 0-.567-.125-1.104-.375-1.612-.25-.509-.642-1.005-1.175-1.488a.999.999 0 0 1-.225-.337A1.034 1.034 0 0 1 15.15 4a1.002 1.002 0 0 1 .25-.675c.1-.1.217-.18.35-.238a.99.99 0 0 1 .4-.087.86.86 0 0 1 .363.075c.108.05.212.117.312.2.733.683 1.28 1.4 1.637 2.15.359.75.538 1.542.538 2.375 0 .583-.087 1.196-.262 1.837-.175.642-.48 1.488-.913 2.538-.417 1-.7 1.767-.85 2.3a5.554 5.554 0 0 0-.225 1.5c0 .583.125 1.154.375 1.713.25.558.625 1.104 1.125 1.637a1.066 1.066 0 0 1 .25.675c0 .133-.025.267-.075.4a.688.688 0 0 1-.25.325Zm-9.75 0c-.1.083-.204.15-.313.2A.855.855 0 0 1 7.75 21a.991.991 0 0 1-.4-.087 1.13 1.13 0 0 1-.35-.238c-.683-.733-1.188-1.48-1.513-2.238A6.06 6.06 0 0 1 5 16.026c0-.617.092-1.275.275-1.975.183-.7.5-1.583.95-2.65.383-.95.65-1.675.8-2.175.15-.5.225-.967.225-1.4 0-.567-.125-1.104-.375-1.612-.25-.509-.642-1.005-1.175-1.488a.87.87 0 0 1-.25-.337A1.034 1.034 0 0 1 5.375 4c0-.133.025-.258.075-.375.05-.117.117-.225.2-.325a.997.997 0 0 1 .725-.3c.133 0 .258.025.375.075.117.05.225.117.325.2.733.683 1.28 1.396 1.638 2.137.358.742.537 1.538.537 2.388A7.31 7.31 0 0 1 9 9.637c-.167.642-.467 1.48-.9 2.513-.417 1-.7 1.767-.85 2.3a5.634 5.634 0 0 0-.225 1.525c0 .583.12 1.154.362 1.713.242.558.613 1.104 1.113 1.637a1.064 1.064 0 0 1 .25.675c0 .133-.025.267-.075.4a.688.688 0 0 1-.25.325Z"
				fill="currentColor"
			/>
		</svg>
	),
	'water-ec': (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M11 18h1l4-6h-3V8h-1l-4 6h3v4Zm1 4c-2.283 0-4.188-.783-5.713-2.35C4.763 18.083 4 16.133 4 13.8c0-1.667.662-3.48 1.987-5.438C7.313 6.405 9.317 4.284 12 2c2.683 2.283 4.688 4.404 6.012 6.363C19.337 10.32 20 12.133 20 13.8c0 2.333-.762 4.283-2.288 5.85C16.188 21.217 14.283 22 12 22Zm0-2c1.733 0 3.167-.587 4.3-1.762S18 15.583 18 13.8c0-1.217-.504-2.592-1.512-4.125C15.479 8.142 13.983 6.467 12 4.65c-1.983 1.817-3.48 3.492-4.487 5.025C6.504 11.208 6 12.583 6 13.8c0 1.783.567 3.262 1.7 4.438C8.833 19.413 10.267 20 12 20Z"
				fill="currentColor"
			/>
		</svg>
	),
	'visibility-on': (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M8 4.333c2.527 0 4.78 1.42 5.88 3.667A6.513 6.513 0 0 1 8 11.667 6.513 6.513 0 0 1 2.12 8 6.513 6.513 0 0 1 8 4.333ZM8 3C4.667 3 1.82 5.073.667 8c1.153 2.927 4 5 7.333 5s6.18-2.073 7.333-5c-1.153-2.927-4-5-7.333-5Zm0 3.333a1.667 1.667 0 1 1-.001 3.335 1.667 1.667 0 0 1 0-3.335ZM8 5C6.346 5 5 6.347 5 8s1.346 3 3 3c1.653 0 3-1.347 3-3S9.653 5 8 5Z"
				fill="currentColor"
			/>
		</svg>
	),
	'visibility-off': (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M8 3.983c2.527 0 4.78 1.42 5.88 3.667a6.43 6.43 0 0 1-1.607 2.08l.94.94a7.868 7.868 0 0 0 2.12-3.02c-1.153-2.927-4-5-7.333-5a7.9 7.9 0 0 0-2.427.38l1.1 1.1A6.74 6.74 0 0 1 8 3.983Zm-.713.76 1.38 1.38c.38.167.686.474.853.854l1.38 1.38c.053-.227.093-.467.093-.714A2.989 2.989 0 0 0 8 4.65c-.247 0-.48.033-.713.093ZM1.34 2.563 3.126 4.35a7.825 7.825 0 0 0-2.46 3.3c1.154 2.927 4 5 7.334 5a7.82 7.82 0 0 0 2.88-.547l2.28 2.28.94-.94L2.28 1.617l-.94.946Zm5 5 1.74 1.74c-.027.007-.053.014-.08.014-.92 0-1.667-.747-1.667-1.667 0-.033.007-.053.007-.087ZM4.073 5.297 5.24 6.463a3.004 3.004 0 0 0 3.94 3.947l.653.653c-.587.16-1.2.254-1.833.254A6.513 6.513 0 0 1 2.12 7.65a6.601 6.601 0 0 1 1.953-2.353Z"
				fill="currentColor"
			/>
		</svg>
	),
	items: (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M18.63 12.451a1.5 1.5 0 0 0-.713-1.282l-.975-.593.968-.592a1.5 1.5 0 0 0 0-2.565L12.57 4.2a1.5 1.5 0 0 0-1.5 0L5.73 7.42a1.5 1.5 0 0 0 0 2.565l.967.592-.975.593a1.5 1.5 0 0 0 0 2.565l.975.592-.967.593a1.5 1.5 0 0 0 0 2.565l5.34 3.217a1.5 1.5 0 0 0 1.5 0l5.31-3.247a1.5 1.5 0 0 0 0-2.565l-.968-.593.975-.592a1.5 1.5 0 0 0 .743-1.253Zm-6.81-6.997L17.13 8.7l-2.408 1.5-2.902 1.748L6.51 8.7l5.31-3.247ZM17.137 16.2l-5.317 3.25-5.31-3.25 1.627-.997 2.933 1.747a1.5 1.5 0 0 0 1.5 0l2.902-1.777 1.665 1.027Zm-2.415-2.25L11.82 15.7l-5.31-3.25 1.627-.997 3.293 2.01a.75.75 0 0 0 .75 0l3.292-2.01 1.658.997-2.408 1.5Z"
				fill="currentColor"
			/>
		</svg>
	),
	filters: (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M7.005 6h10l-5.01 6.3L7.005 6Zm-2.75-.39c2.02 2.59 5.75 7.39 5.75 7.39v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39a.998.998 0 0 0-.79-1.61H5.045c-.83 0-1.3.95-.79 1.61Z"
				fill="currentColor"
			/>
		</svg>
	),
	calendar: (
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M14.25 3h-.75V1.5H12V3H6V1.5H4.5V3h-.75c-.833 0-1.493.675-1.493 1.5L2.25 15a1.5 1.5 0 0 0 1.5 1.5h10.5c.825 0 1.5-.675 1.5-1.5V4.5c0-.825-.675-1.5-1.5-1.5Zm0 12H3.75V7.5h10.5V15Zm0-9H3.75V4.5h10.5V6ZM9 9.75h3.75v3.75H9V9.75Z" fill="#90909A" />
		</svg>
	),
	clock: (
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8.992 1.5C4.853 1.5 1.5 4.86 1.5 9c0 4.14 3.353 7.5 7.492 7.5 4.148 0 7.508-3.36 7.508-7.5 0-4.14-3.36-7.5-7.508-7.5ZM9 15c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6Zm.375-9.75H8.25v4.5l3.938 2.363.562-.923-3.375-2.002V5.25Z" fill="#90909A" />
		</svg>
	),
	marker: (
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M9 1.5a5.246 5.246 0 0 0-5.25 5.25C3.75 10.688 9 16.5 9 16.5s5.25-5.813 5.25-9.75A5.246 5.246 0 0 0 9 1.5ZM5.25 6.75C5.25 4.68 6.93 3 9 3c2.07 0 3.75 1.68 3.75 3.75 0 2.16-2.16 5.393-3.75 7.41-1.56-2.002-3.75-5.273-3.75-7.41Z" fill="#90909A" />
			<path d="M9 8.625a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" fill="#90909A" />
		</svg>
	),
};

export default icons;
