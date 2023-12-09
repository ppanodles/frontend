import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NAVBAR_HEIGHT_MOBILE, NAVBAR_HEIGHT_DESKTOP } from 'library/constants/styled';
import Navbar from '../Navbar';
import SidePanel from '../SidePanel';

interface IProps {}

const Dashboard: React.FunctionComponent<IProps> = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	return (
		<Box sx={() => ({
			display: 'flex',
			minHeight: '100%',
			width: '100%',
			overflow: 'hidden',
		})}
		>
			<Navbar handleDrawerToggle={handleDrawerToggle} />
			<SidePanel open={mobileOpen} onClose={handleDrawerToggle} />
			<Box sx={() => ({
				position: 'relative',
				flexGrow: 1,
				display: 'flex',
				overflow: 'auto',
				pt: { xs: NAVBAR_HEIGHT_MOBILE / 8, md: NAVBAR_HEIGHT_DESKTOP / 8 },
				height: '100%',
				minHeight: '100%',
			})}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Dashboard;
