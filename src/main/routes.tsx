import Dashboard from 'library/components/Dashboard';
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
				element: <Dashboard />,
				children: [
					{ path: '/app/marine-farming/map', element: <MarineFarming display="map" /> },
					{ path: '/app/marine-farming/charts', element: <MarineFarming display="chart" /> },
					{ path: '/app/marine-farming/table', element: <MarineFarming display="table" /> },
					{ path: '/app/marine-farming/*', element: <Navigate to="/app/marine-farming/map" replace />},
				],
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
