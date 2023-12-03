import React from 'react';
import {
	AppBar, Button, IconButton, Toolbar,
} from '@mui/material';
import {
	DRAWER_WIDTH, NAVBAR_HEIGHT_MOBILE, NAVBAR_HEIGHT_DESKTOP,
} from 'library/constants/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { IconNames } from 'resources/icons';
import paths from 'library/paths';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import Icon from '../Icon';

interface IProps {
    handleDrawerToggle(): void;
}

interface IButtons{
	name: string;
	iconName: IconNames;
	target: string;
}

const buttons: IButtons[] = [
	{ name: 'Морехозяйство', iconName: 'marine-farming', target: paths.marineFarming.base },
	{ name: 'Агропромышленность', iconName: 'agro-industry', target: paths.agroIndustry.base },
	{ name: 'Муниципалитет', iconName: 'municipality', target: paths.municipality.base },
];

const Navbar: React.FunctionComponent<IProps> = ({ handleDrawerToggle }) => {
	const location = useLocation();

	return (
		<AppBar
			position="fixed"
			color="primary"
			sx={{
				width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
				ml: { sm: `${DRAWER_WIDTH}px` },
			}}
		>
			<Toolbar sx={{
				height: { xs: NAVBAR_HEIGHT_MOBILE, md: NAVBAR_HEIGHT_DESKTOP },
				minHeight: { xs: NAVBAR_HEIGHT_MOBILE, md: NAVBAR_HEIGHT_DESKTOP },
			}}
			>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
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
								textTransform: 'none',
								fontSize: '1rem',
								...(location.pathname.includes(button.target) && {color: (theme) => theme.palette.common.white}),
							}}
							startIcon={<Icon iconName={button.iconName} />}
						>
							{button.name}
						</Button>
					))
				}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
