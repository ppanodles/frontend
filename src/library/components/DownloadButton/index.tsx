/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
import {
	Button,
	SxProps, Theme,
} from '@mui/material';
import React, { useMemo } from 'react';
import { RootState } from 'main/rootReducer';
import { useSelector } from 'react-redux';
import selectFilteredFilmContaminations from 'library/selectors/filmContamination.selector';
import selectFilteredGases from 'library/selectors/gases.selector';
import selectFilteredShips from 'library/selectors/ships.selector';
import Papa from 'papaparse';
import { IFilmContamination, IGreenhouseGases, IShip } from 'library/types/marineFarming';
import { useLocation } from 'react-router-dom';
import selectFilteredEcoCityStates from 'library/selectors/ecoCity.selector';
import paths from 'library/paths';
import { IEcoCityState } from 'library/types/ecoCity';
import { IEcoFarmlandState } from 'library/types/ecoFarmland';
import selectFilteredEcoFarmlandStates from 'library/selectors/ecoFarmland.selector';
import Icon from '../Icon';

const buttonStyles: SxProps<Theme> = (theme) => ({
	textTransform: 'none',
	borderStyle: 'none',
	borderRadius: '20px!important',
	backgroundColor: theme.palette.primary.main,
	width: '40px',
	height: '40px',
	minWidth: '40px',

	'&:hover': {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.common.white,
	},
});

const getUrl = (downloadingData: IShip[] | IGreenhouseGases[] | IFilmContamination[] | IEcoCityState[] | IEcoFarmlandState[] | undefined): string => {
	if (!downloadingData) {
		return '';
	}
	const csvData = Papa.unparse<IShip | IGreenhouseGases | IFilmContamination | IEcoCityState | IEcoFarmlandState>(downloadingData);
	const blob = new Blob([csvData ?? ''], { type: 'text/csv;charset=utf-8;' });
	return URL.createObjectURL(blob);
};

const DownloadButton: React.FunctionComponent = () => {
	const slicesAccessibility = useSelector((state: RootState) => state.marineFarming.slicesStatus);
	const { pathname } = useLocation();

	const ships = useSelector(selectFilteredShips);
	const greenhouseGases = useSelector(selectFilteredGases);
	const filmContamination = useSelector(selectFilteredFilmContaminations);
	const ecoCity = useSelector(selectFilteredEcoCityStates);
	const ecoFarmland = useSelector(selectFilteredEcoFarmlandStates);

	const marineFarmingData = useMemo(
		() => {
			if (slicesAccessibility.SHIPS) {
				return ships;
			}
			if (slicesAccessibility.FILM_CONTAMINATION) {
				return filmContamination;
			}
			if (slicesAccessibility.GREENHOUSE_GASES) {
				return greenhouseGases;
			}
			return undefined;
		},
		[filmContamination, greenhouseGases, ships, slicesAccessibility],
	);

	const downloadingData = pathname.includes(paths.marineFarming.base) ? marineFarmingData : pathname.includes(paths.agroIndustry.base) ? ecoFarmland : pathname.includes(paths.municipality.base) ? ecoCity : undefined;

	return (
		<a
			href={getUrl(downloadingData)}
			download="data.csv"
			target="_blank"
			rel="noreferrer"
		>
			<Button
				sx={buttonStyles}
			>
				<Icon iconName="download" />
			</Button>
		</a>
	);
};

export default DownloadButton;
