import Dashboard from 'library/components/Dashboard';
import paths, { LayoutType } from 'library/paths';
import AgroIndustry from 'pages/AgroIndustry';
import MarineFarming from 'pages/MarineFarming';
import Municipality from 'pages/Municipality';
import { createHashRouter, Navigate } from 'react-router-dom';

export default createHashRouter([
	{
		path: '/app',
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
					{ path: paths.agroIndustry[LayoutType.CHARTS], element: <AgroIndustry /> },
					{ path: paths.agroIndustry[LayoutType.TABLE], element: <AgroIndustry /> },
					{ path: paths.agroIndustry.base, element: <Navigate to={paths.agroIndustry[LayoutType.TABLE]} replace />},
				],
			},
			{
				path: paths.municipality.base,
				element: <Dashboard />,
				children: [
					{ path: paths.municipality[LayoutType.CHARTS], element: <Municipality /> },
					{ path: paths.municipality[LayoutType.TABLE], element: <Municipality /> },
					{ path: paths.municipality.base, element: <Navigate to={paths.municipality[LayoutType.TABLE]} replace />},
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
