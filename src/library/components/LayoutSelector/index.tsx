import {
	SxProps, Theme, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import React from 'react';
import { LayoutType } from 'library/paths';
import Icon from '../Icon';

interface IProps {
    value: LayoutType | null;
    setValue(value: LayoutType | null): void;
    disableMaps?: boolean;
}

const buttonStyles: SxProps<Theme> = (theme) => ({
	px: 3,
	textTransform: 'none',
	borderStyle: 'none',
	borderRadius: '20px!important',
	'&:not(:last-child)': {
		mr: 1,
	},

	'&:hover': {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.common.white,
	},

	'&.Mui-selected': {
		backgroundColor: theme.palette.success.dark,
		color: theme.palette.common.white,

		'&:hover': {
			backgroundColor: theme.palette.success.main,
		},
	},
});

const LayoutSelector: React.FunctionComponent<IProps> = ({ value, disableMaps, setValue }) => {
	const handleChange = (_: unknown, val: LayoutType) => setValue(val);

	return (
		<ToggleButtonGroup
			value={value}
			exclusive
			onChange={handleChange}
			aria-label="Layout selector"
			sx={(theme) => ({
				height: '40px',
				borderRadius: '20px',
				backgroundColor: theme.palette.primary.main,
			})}
		>
			{!disableMaps && (
				<ToggleButton value={LayoutType.MAP} sx={buttonStyles}>
					<Icon iconName="map" sx={{mr: 1}} />
					Карта
				</ToggleButton>
			)}
			<ToggleButton value={LayoutType.TABLE} sx={buttonStyles}>
				<Icon iconName="tables" sx={{mr: 1}} />
				Таблицы

			</ToggleButton>
			<ToggleButton value={LayoutType.CHARTS} sx={buttonStyles}>
				<Icon iconName="diagram" sx={{mr: 1}} />
				Графики
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default LayoutSelector;
