import AgroIndustry from 'pages/AgroIndustry';
import MarineFarming from 'pages/MarineFarming';
import Municipality from 'pages/Municipality';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export default createBrowserRouter([
	{
		path: '/app',
		children: [
			{
				path: '/app/marine-farming',
				element: <MarineFarming />,
			},
			{
				path: '/app/agro-industry',
				element: <AgroIndustry />,
			},
			{
				path: '/app/municipality',
				element: <Municipality />,
			},
			{
				element: <Navigate to="/app/marine-farming" replace />,
			},
		],
	},
	{ path: '/', element: <Navigate to="/app/marine-farming" replace /> },
	{ path: '*', element: <Navigate to="/app/marine-farming" replace /> },
]);
