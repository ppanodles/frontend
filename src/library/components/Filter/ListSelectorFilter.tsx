import React from 'react';
import {
	Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography,
} from '@mui/material';

import { filterLabelSx } from './commonData';

export type IListSelectorFilter = {
    name: string;
    values: {
        id: string;
        name: string;
    }[];
    checked: {[key: string]: boolean};
	onSelect(value: {[key: string]: boolean}): void;
}

const ListSelectorFilter: React.FunctionComponent<IListSelectorFilter> = ({
	name, values, checked, onSelect,
}) => {
	const selectHandler = (id: string) => {
		onSelect({
			...checked,
			[id]: !checked[id],
		});
	};

	return (
		<Stack>
			<Typography sx={filterLabelSx}>
				{name}
			</Typography>

			<List sx={{ width: '100%' }}>
				{values.map(({ id, name: itemName }) => {
					const labelId = `checkbox-list-label-${id}`;

					return (
						<ListItem key={id} disablePadding>
							<ListItemButton
								role={undefined}
								onClick={() => selectHandler(id)}
								dense
							>
								<ListItemIcon sx={{ minWidth: 0 }}>
									<Checkbox
										color="success"
										edge="start"
										checked={Boolean(checked[id])}
										tabIndex={-1}
										disableRipple
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								</ListItemIcon>
								<ListItemText id={labelId} primary={itemName} sx={(theme) => ({ color: theme.palette.text.secondary })} />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>

		</Stack>
	);
};

export default ListSelectorFilter;
