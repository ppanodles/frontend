import React from 'react';
import {
	AppBar, Button, IconButton, SxProps, Theme, Toolbar,
} from '@mui/material';
import {
	DRAWER_WIDTH, NAVBAR_HEIGHT_MOBILE, NAVBAR_HEIGHT_DESKTOP,
} from 'library/constants/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { IconNames } from 'resources/icons';
import paths from 'library/paths';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Icon from '../Icon';

interface IProps {
	fullWidthMode?: boolean,
    handleDrawerToggle?(): void;
}

interface IButtons{
	name: string;
	iconName: IconNames;
	target: string;
	sx?: SxProps<Theme>;
}

const buttons: IButtons[] = [
	{ name: 'Морехозяйство', iconName: 'marine-farming', target: paths.marineFarming.base },
	{ name: 'Агропромышленность', iconName: 'agro-industry', target: paths.agroIndustry.base },
	{ name: 'Муниципалитет', iconName: 'municipality', target: paths.municipality.base },
	{
		name: 'О нас', iconName: 'about', target: paths.about, sx: { ml: 'auto' },
	},
];

const Navbar: React.FunctionComponent<IProps> = ({ fullWidthMode, handleDrawerToggle }) => {
	const location = useLocation();

	return (
		<AppBar
			position="fixed"
			color="primary"
			sx={{
				...(!fullWidthMode && {
					width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
					ml: { sm: `${DRAWER_WIDTH}px` },
				}),
			}}
		>
			<Toolbar sx={{
				...(!fullWidthMode && {
					height: { xs: NAVBAR_HEIGHT_MOBILE, md: NAVBAR_HEIGHT_DESKTOP },
					minHeight: { xs: NAVBAR_HEIGHT_MOBILE, md: NAVBAR_HEIGHT_DESKTOP },
				}),
			}}
			>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={() => handleDrawerToggle?.()}
					sx={{ mr: 2, display: { sm: 'none' } }}
				>
					<MenuIcon />
				</IconButton>
				{
					buttons.map((button) => (
						<Button
							component={RouterLink}
							to={button.target}
							key={button.name}
							color="info"
							sx={{
								mr: isMobile ? 4 : 0,
								textTransform: 'none',
								fontSize: '1rem',
								...button.sx,
								...(location.pathname.includes(button.target) && {color: (theme) => theme.palette.common.white}),
							}}
							startIcon={<Icon iconName={button.iconName} />}
						>
							{!isMobile ? button.name : undefined}
						</Button>
					))
				}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
