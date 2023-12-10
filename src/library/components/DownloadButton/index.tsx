/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
import {
	Button,
	SxProps, Theme,
} from '@mui/material';
import React, { useEffect, useState} from 'react';
import { RootState } from 'main/rootReducer';
import { useSelector } from 'react-redux';
import selectFilteredFilmContaminations from 'library/selectors/filmContamination.selector';
import selectFilteredGases from 'library/selectors/gases.selector';
import selectFilteredShips from 'library/selectors/ships.selector';
import Papa from 'papaparse';
import { IFilmContamination, IGreenhouseGases, IShip } from 'library/types/marineFarming';
import { useLocation } from 'react-router-dom';
import selectFilteredMunicipalityStates from 'library/selectors/municipality.selector';
import paths from 'library/paths';
import { IMunicipalityState } from 'library/types/municipality';
import { IAgroState } from 'library/types/agro';
import selectFilteredAgroStates from 'library/selectors/agro.selector';
import Icon from '../Icon';

type DataType = IShip[] | IGreenhouseGases[] | IFilmContamination[] | IMunicipalityState[] | IAgroState[] | undefined

enum DownloadFileNameType {
    FILM ='плёночные_загрязнения',
    GASES ='парниковые_газы',
    AGRO = 'агропромышленность',
    MUNICIPALITY = 'муниципалитет',
    SHIPS = 'корабли',
}

interface IDownloadingdata {
	data: DataType;
	fileName: DownloadFileNameType;
}

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

const getUrl = (downloadingData: DataType): string => {
	if (!downloadingData) {
		return '';
	}
	const csvData = Papa.unparse<IShip | IGreenhouseGases | IFilmContamination | IMunicipalityState | IAgroState>(downloadingData);
	const blob = new Blob([csvData ?? ''], { type: 'text/csv;charset=utf-8;' });
	return URL.createObjectURL(blob);
};

const DownloadButton: React.FunctionComponent = () => {
	const { pathname } = useLocation();
	const slicesAccessibility = useSelector((state: RootState) => state.marineFarming.slicesStatus);

	const ships = useSelector(selectFilteredShips);
	const greenhouseGases = useSelector(selectFilteredGases);
	const filmContamination = useSelector(selectFilteredFilmContaminations);
	const agro = useSelector(selectFilteredMunicipalityStates);
	const municipality = useSelector(selectFilteredAgroStates);

	const [downloadingData, setDownloadingData] = useState<IDownloadingdata>({data: ships, fileName: DownloadFileNameType.SHIPS});

	useEffect(() => {
		if (pathname.includes(paths.marineFarming.base)) {
			if (slicesAccessibility.SHIPS) {
				setDownloadingData({data: ships, fileName: DownloadFileNameType.SHIPS});
				return;
			}
			if (slicesAccessibility.FILM_CONTAMINATION) {
				setDownloadingData({data: filmContamination, fileName: DownloadFileNameType.FILM});
				return;
			}
			if (slicesAccessibility.GREENHOUSE_GASES) {
				setDownloadingData({data: greenhouseGases, fileName: DownloadFileNameType.GASES});
				return;
			}
		}

		if (pathname.includes(paths.agroIndustry.base)) {
			setDownloadingData({data: agro, fileName: DownloadFileNameType.AGRO});
			return;
		}

		if (pathname.includes(paths.municipality.base)) {
			setDownloadingData({data: municipality, fileName: DownloadFileNameType.MUNICIPALITY});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, slicesAccessibility]);

	return (
		<a
			href={getUrl(downloadingData.data)}
			download={`${downloadingData.fileName}.csv`}
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
