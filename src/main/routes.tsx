import Dashboard from 'library/components/Dashboard';
import paths from 'library/paths';
import AgroIndustry from 'pages/AgroIndustry';
import MarineFarming from 'pages/MarineFarming';
import Municipality from 'pages/Municipality';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export default createBrowserRouter([
	{
		path: '/app',
		children: [
			{
				path: paths.marineFarming.base,
				element: <Dashboard />,
				children: [
					{ path: paths.marineFarming.map, element: <MarineFarming display="map" /> },
					{ path: paths.marineFarming.charts, element: <MarineFarming display="chart" /> },
					{ path: paths.marineFarming.table, element: <MarineFarming display="table" /> },
					{ path: paths.marineFarming.base, element: <Navigate to={paths.marineFarming.map} replace />},
				],
			},
			{
				path: paths.agroIndustry.base,
				element: <Dashboard />,
				children: [
					{ path: paths.agroIndustry.charts, element: <AgroIndustry display="chart" /> },
					{ path: paths.agroIndustry.table, element: <AgroIndustry display="table" /> },
					{ path: paths.agroIndustry.base, element: <Navigate to={paths.agroIndustry.table} replace />},
				],
			},
			{
				path: paths.municipality.base,
				element: <Dashboard />,
				children: [
					{ path: paths.municipality.charts, element: <Municipality display="chart" /> },
					{ path: paths.municipality.table, element: <Municipality display="table" /> },
					{ path: paths.municipality.base, element: <Navigate to={paths.municipality.base} replace />},
				],
			},
			{
				element: <Navigate to={paths.marineFarming.base} replace />,
			},
		],
	},
	{ path: '/', element: <Navigate to={paths.marineFarming.base} replace /> },
	{ path: '*', element: <Navigate to={paths.marineFarming.base} replace /> },
]);
