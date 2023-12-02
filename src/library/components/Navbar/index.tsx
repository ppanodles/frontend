import React from 'react';
import {
	AppBar, Button, IconButton, Toolbar,
} from '@mui/material';
import { DRAWER_WIDTH } from 'library/constants/styled';
import MenuIcon from '@mui/icons-material/Menu';

interface IProps {
    handleDrawerToggle(): void;
}

const buttons = [
	{ name: 'Морехозяйство' },
	{ name: 'Агропромышленность' },
	{ name: 'Муниципалитет' },
];

const Navbar: React.FunctionComponent<IProps> = ({ handleDrawerToggle }) => (
	<AppBar
		position="fixed"
		color="primary"
		sx={{
			width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
			ml: { sm: `${DRAWER_WIDTH}px` },
		}}
	>
		<Toolbar>
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
				buttons.map((button) => <Button key={button.name} color="info">{button.name}</Button>)
			}
		</Toolbar>
	</AppBar>
);

export default Navbar;
