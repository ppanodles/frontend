import React from 'react';
import { isMobile } from 'react-device-detect';
import { Box, Drawer } from '@mui/material';
import { DRAWER_WIDTH } from 'library/constants/styled';
import paths from 'library/paths';
import { useLocation } from 'react-router-dom';

import MarineFarmingPanel from '../MarineFarmingPanel';

interface IProps {
    open: boolean;
    onClose(): void;
}

const getPanel = (path: string) => {
	if (path.includes(paths.marineFarming.base)) {
		return <MarineFarmingPanel />;
	}

	if (path.includes(paths.agroIndustry.base)) {
		return 'agroIndustry';
	}

	if (path.includes(paths.municipality.base)) {
		return 'municipality';
	}

	return null;
};

const SidePanel: React.FunctionComponent<IProps> = ({ open, onClose }) => {
	const { pathname } = useLocation();

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
				sx={(theme) => ({
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: DRAWER_WIDTH,
						backgroundColor: theme.palette.primary.main,
						border: 'none',
					},
				})}
			>
				{getPanel(pathname)}
			</Drawer>
		</Box>
	);
};

export default SidePanel;
