import React from 'react';
import {
	Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography,
} from '@mui/material';

import { filterLabelSx } from './commonData';

export type ISelectOneFilter = {
    name: string;
    values: {
        id: string;
        name: string;
    }[];
    checked: { id: string, name: string };
	onChange(value: {id: string, name: string}): void;
}

const SelectOneFilter: React.FunctionComponent<ISelectOneFilter> = ({
	name, values, checked, onChange,
}) => (
	<Stack>
		<Typography sx={filterLabelSx}>
			{name}
		</Typography>

		<List sx={{ width: '100%' }}>
			{values.map(({ id, name: value }) => {
				const labelId = `checkbox-list-label-${id}`;

				return (
					<ListItem key={id} disablePadding>
						<ListItemButton
							role={undefined}
							onClick={() => onChange({id, name: value})}
							dense
						>
							<ListItemIcon sx={{ minWidth: 0 }}>
								<Checkbox
									color="success"
									edge="start"
									checked={Boolean(checked.id === id)}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value} sx={(theme) => ({ color: theme.palette.text.secondary })} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>

	</Stack>
);

export default SelectOneFilter;
