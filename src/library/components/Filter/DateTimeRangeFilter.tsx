import {
	Box, SxProps, Theme, Typography,
} from '@mui/material';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { filterLabelSx } from './commonData';
import 'dayjs/locale/ru';

export type IDateTimeRangeFilter = {
    name: string;
    value?: { from: Date; to: Date };
	borders: { from: Date; to: Date };}

const pickerSx: SxProps<Theme> = ({ palette }) => ({
	'.MuiInputBase-root': {
		backgroundColor: palette.primary.light,
		color: palette.text.secondary,

		input: {
			pt: '20px',
			pb: '13px',
		},

	},
	'.MuiButtonBase-root': {
		color: palette.text.secondary,
	},
	'.MuiDateCalendar-root': {
		backgroundColor: palette.background.default,
	},
});

const calendarSx: SxProps<Theme> = ({ palette }) => ({
	'.MuiDateCalendar-root': {
		color: '#ACAAAF',
		backgroundColor: palette.background.default,
	},
	'.MuiDayCalendar-root': {
		color: '#ACAAAF',
	},
	'.MuiButtonBase-root': {
		color: '#ACAAAF',

		'&:hover': {
			backgroundColor: '#0068753D',
		},
	},
	'.Mui-selected': {
		backgroundColor: '#006875!important',
	},
});

const DateTimeRangeFilter: React.FunctionComponent<IDateTimeRangeFilter> = ({ name, borders, value }) => (
	<Box>
		<Typography sx={filterLabelSx} mb={1}>
			{name}
		</Typography>

		<Typography variant="caption">Задать произвольный период времени</Typography>
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
			<Box sx={{ position: 'relative', mt: 2, mb: 1 }}>
				<Typography
					sx={{
						color: ({palette}) => palette.text.secondary,
						position: 'absolute',
						top: 0,
						left: 14,
						zIndex: 10,
					}}
					variant="caption"
				>
					от
				</Typography>
				<DatePicker
					value={dayjs(value?.from ?? borders.from)}
					views={['year', 'month', 'day']}
					sx={pickerSx}
					slotProps={{
						layout: {
							sx: calendarSx,
						},
					}}
				/>
			</Box>

			<Box sx={{ position: 'relative', mb: 2 }}>
				<Typography
					sx={{
						color: ({palette}) => palette.text.secondary,
						position: 'absolute',
						top: 0,
						left: 14,
						zIndex: 10,
					}}
					variant="caption"
				>
					до
				</Typography>
				<DatePicker
					value={dayjs(value?.to ?? borders.to)}
					views={['year', 'month', 'day']}
					sx={pickerSx}
					slotProps={{
						layout: {
							sx: calendarSx,
						},
					}}
				/>
			</Box>
		</LocalizationProvider>
	</Box>
);

export default DateTimeRangeFilter;
