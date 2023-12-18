import React from 'react';
import {
	Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography,
} from '@mui/material';

import { omit } from 'lodash';
import { filterLabelSx } from './commonData';

export type IListSelectorFilter = {
    name: string;
    values: {
        id: string;
        name: string;
    }[];
    checked: { [key: string]: string };
	onChange(value: {[key: string]: string}): void;
}

const ListSelectorFilter: React.FunctionComponent<IListSelectorFilter> = ({
	name, values, checked, onChange,
}) => {
	const selectHandler = (id: string, value: string) => {
		onChange(checked[id] ? omit(checked, id) : { ...checked, [id]: value });
	};

	return (
		<Stack my={1}>
			<Typography sx={filterLabelSx}>
				{name}
			</Typography>

			<List sx={{ width: '100%' }}>
				{values.map(({ id, name: value }) => {
					const labelId = `checkbox-list-label-${id}`;

					return (
						<ListItem key={id} disablePadding>
							<ListItemButton
								sx={{height: '2.5rem'}}
								role={undefined}
								onClick={() => selectHandler(id, value)}
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
								<ListItemText id={labelId} primary={value} sx={(theme) => ({ color: theme.palette.text.secondary })} />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>

		</Stack>
	);
};

export default ListSelectorFilter;
