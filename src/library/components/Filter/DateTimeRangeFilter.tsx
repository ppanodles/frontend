import {
	Box, SxProps, Theme, Typography,
} from '@mui/material';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { filterLabelSx } from './commonData';
import 'dayjs/locale/ru';

export type IDateTimeRangeFilter = {
    name: string;
    value?: { from: string; to: string };
	borders: { from: string; to: string };
	onChange(value: { from: string; to: string }): void;
}

const pickerSx: SxProps<Theme> = ({ palette }) => ({
	'.MuiInputBase-root': {
		backgroundColor: palette.primary.light,
		color: palette.text.secondary,

		input: {
			pt: '20px',
			pb: '13px',

			'&:focused': {
				color: palette.common.white,
			},
		},

	},
	'.MuiButtonBase-root': {
		color: palette.text.secondary,
	},
	'.MuiDateCalendar-root': {
		backgroundColor: palette.background.paper,
	},
});

const calendarSx: SxProps<Theme> = ({ palette }) => ({
	'.MuiDateCalendar-root': {
		color: '#ACAAAF',
		backgroundColor: palette.background.paper,
	},
	'.MuiDayCalendar-root': {
		color: '#ACAAAF',
	},
	'.MuiButtonBase-root': {
		color: '#ACAAAF',

		'&:disabled': {
			color: '#3A434C!important',
		},

		'&:hover': {
			backgroundColor: '#0068753D',
		},
	},
	'.Mui-selected': {
		backgroundColor: '#006875!important',
	},
});

const labelSx: SxProps<Theme> = {
	color: '#46464F',
	position: 'absolute',
	top: 0,
	left: 14,
	zIndex: 10,
};

// TODO сделать так, чтоб даты свапались по величене
const DateTimeRangeFilter: React.FunctionComponent<IDateTimeRangeFilter> = ({
	name, borders, value, onChange,
}) => {
	const handleOnChange = (date: { from?: Dayjs | null, to?: Dayjs | null }) => {
		if (date.from) {
			const to = dayjs(value?.to ?? borders.to);
			onChange({ from: date.from.toString(), to: to.toString() });
		}

		if (date.to) {
			const from = dayjs(value?.from ?? borders.from);
			onChange({ from: from.toString(), to: date.to.toString() });
		}
	};

	return (
		<Box my={1.5}>
			<Typography sx={filterLabelSx} mb={1}>
				{name}
			</Typography>

			<Typography variant="caption">Задать произвольный период времени</Typography>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
				<Box sx={{ position: 'relative', my: 1 }}>
					<Typography
						sx={labelSx}
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
						onChange={(date) => handleOnChange({ from: date })}
						minDate={dayjs(borders.from)}
						maxDate={value?.to ? dayjs(value.to) : dayjs(borders.to)}
					/>
				</Box>

				<Box sx={{ position: 'relative', mb: 2 }}>
					<Typography
						sx={labelSx}
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
						onChange={(date) => handleOnChange({ to: date })}
						minDate={value?.from ? dayjs(value.from) : dayjs(borders.from)}
						maxDate={dayjs(borders.to)}
					/>
				</Box>
			</LocalizationProvider>
		</Box>
	);
};

export default DateTimeRangeFilter;
