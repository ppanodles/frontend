import Dashboard from 'library/components/Dashboard';
import paths, { LayoutType } from 'library/paths';
import AgroIndustry from 'pages/AgroIndustry';
import MarineFarming from 'pages/MarineFarming';
import Municipality from 'pages/Municipality';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export default createBrowserRouter([
	{
		path: '/frontend/app',
		children: [
			{
				path: paths.marineFarming.base,
				element: <Dashboard />,
				children: [
					{ path: paths.marineFarming[LayoutType.MAP], element: <MarineFarming /> },
					{ path: paths.marineFarming[LayoutType.CHARTS], element: <MarineFarming /> },
					{ path: paths.marineFarming[LayoutType.TABLE], element: <MarineFarming /> },
					{ path: paths.marineFarming.base, element: <Navigate to={paths.marineFarming[LayoutType.MAP]} replace />},
				],
			},
			{
				path: paths.agroIndustry.base,
				element: <Dashboard />,
				children: [
					{ path: paths.agroIndustry.charts, element: <AgroIndustry /> },
					{ path: paths.agroIndustry.table, element: <AgroIndustry /> },
					{ path: paths.agroIndustry.base, element: <Navigate to={paths.agroIndustry.table} replace />},
				],
			},
			{
				path: paths.municipality.base,
				element: <Dashboard />,
				children: [
					{ path: paths.municipality.charts, element: <Municipality /> },
					{ path: paths.municipality.table, element: <Municipality /> },
					{ path: paths.municipality.base, element: <Navigate to={paths.municipality.table} replace />},
				],
			},
			{
				element: <Navigate to={paths.marineFarming.base} replace />,
			},
		],
	},
	{ path: '/frontend/app/', element: <Navigate to={paths.marineFarming.base} replace /> },
	{ path: '/', element: <Navigate to={paths.marineFarming.base} replace /> },
	{ path: '*', element: <Navigate to={paths.marineFarming.base} replace /> },
]);
