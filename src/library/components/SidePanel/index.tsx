import React from 'react';
import { isMobile } from 'react-device-detect';
import {
	Box, Drawer, Stack, useTheme,
} from '@mui/material';
import { DRAWER_WIDTH } from 'library/constants/styled';
import paths from 'library/paths';
import { useLocation } from 'react-router-dom';

import MarineFarmingPanel from '../MarineFarmingPanel';
import Icon from '../Icon';
import AgroPanel from '../AgroPanel';
import CityPanel from '../CityPanel';

interface IProps {
    open: boolean;
    onClose(): void;
}

const getPanel = (path: string) => {
	if (path.includes(paths.marineFarming.base)) {
		return <MarineFarmingPanel />;
	}

	if (path.includes(paths.agroIndustry.base)) {
		return <AgroPanel />;
	}

	if (path.includes(paths.municipality.base)) {
		return <CityPanel />;
	}

	return null;
};

const SidePanel: React.FunctionComponent<IProps> = ({ open, onClose }) => {
	const { pathname } = useLocation();
	const theme = useTheme();

	return (
		<Box
			sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
			aria-label="mailbox folders"
		>
			<Drawer
				variant={isMobile ? 'temporary' : 'permanent'}
				open={isMobile ? open : true}
				onClose={onClose}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: DRAWER_WIDTH,
						backgroundColor: theme.palette.primary.main,
						border: 'none',
					},
				}}
			>
				<Stack sx={{ overflow: 'hidden' }}>
					<Box sx={{
						minHeight: '56px', width: '80px', height: '56px', display: 'flex', marginLeft: '15px', alignItems: 'center', justifyContent: 'center',
					}}
					>
						<Icon iconName="logo" style={{width: '100%', height: '100%'}} />
					</Box>
					<Box sx={{
						py: 2,
						overflowY: 'auto',
						overflowX: 'hidden',

						'&::-webkit-scrollbar': {
							marginTop: '80px',
							width: '0.3rem',
						},

						'&::-webkit-scrollbar-thumb': {
							borderRadius: '8px',
							backgroundColor: theme.palette.background.paper,
						},
					}}
					>
						{getPanel(pathname)}
					</Box>
				</Stack>
			</Drawer>
		</Box>
	);
};

export default SidePanel;
