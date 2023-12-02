import React from 'react';
import { isMobile } from 'react-device-detect';
import { Box, Drawer } from '@mui/material';
import { DRAWER_WIDTH } from 'library/constants/styled';

interface IProps {
    open: boolean;
    onClose(): void;
}

const SidePanel: React.FunctionComponent<IProps> = ({ open, onClose }) => (
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
		/>
	</Box>
);

export default SidePanel;
