import React, { useState } from 'react';
import {
	Box,
	Divider,
	Input,
	Slider, Stack, SxProps, Theme, Typography,
} from '@mui/material';

import { toInteger } from 'lodash';
import { filterLabelSx } from './commonData';

export type IRangeFilter = {
    name: string;
    value?: { from: number; to: number };
	borders: { from: number; to: number };
	onChange(value: { from: number; to: number }): void;
	pepticColor?: string;
}

const InputSx: SxProps<Theme> = {
	input: {
		fontSize: '0.9rem',
		fontWeight: '600',
		color: ({ palette }) => palette.info.main,
	},
	'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
		display: 'none',
	},
	'& input[type=number]': {
		MozAppearance: 'textfield',
	},
};

const borderLabels = ['от', 'до'];

const RangeFilter: React.FunctionComponent<IRangeFilter> = ({
	name, borders, value: filterValue, onChange, pepticColor,
}) => {
	const [value, setValue] = useState([filterValue?.from ?? borders.from, filterValue?.to ?? borders.to]);

	const handleChange = (_: any, newValue: number | number[]) => {
		setValue(newValue as number[]);
	};

	const handleChangeCommitted = (_: any, dots: number | number[]) => {
		onChange({
			from: (dots as number[])?.[0] ?? borders.from,
			to: (dots as number[])?.[1] ?? borders.to,
		});
	};

	const handleSubmit = () => {
		const newValue = {
			from: value[0] < borders.from || value[0] > borders.to ? borders.from : value[0],
			to: value[1] < borders.from || value[0] > borders.to ? borders.to : value[1],
		};

		setValue([newValue.from, newValue.to]);
		onChange(newValue);
	};

	return (
		<Stack my={1.5} spacing={2} sx={{ width: '100%' }}>
			<Typography sx={filterLabelSx}>
				{name}
			</Typography>
			<Stack alignItems="center">
				<Stack
					direction="row"
					sx={{
						height: '40px',
						backgroundColor: (theme) => theme.palette.primary.light,
					}}
				>
					{/* TODO добавить валидацию чисел чтоб не начинались с нуля */}
					{borderLabels.map((label, index) => (
						<Box key={label} sx={{ display: 'flex', pl: 5, position: 'relative' }}>
							<Typography
								variant="body1"
								sx={{
									position: 'absolute', zIndex: 1, top: 7, left: 13,
								}}
							>
								{label}
							</Typography>
							<Input
								sx={InputSx}
								type="number"
								value={value[index]}
								disableUnderline
								onChange={(event) => {
									const enteredData = toInteger(event.target.value);

									setValue((prev) => prev.map((v, i) => (i === index ? enteredData : v)));
								}}
								onBlur={handleSubmit}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										handleSubmit();
									}
								}}
							/>
							{index === 0 && (
								<Divider
									orientation="vertical"
									variant="middle"
									sx={{
										borderColor: '#46464F',
										borderRadius: '1px',
										borderWidth: 1,
									}}
									flexItem
								/>
							)}
						</Box>
					))}
				</Stack>
				<Slider
					min={borders.from}
					max={borders.to}
					value={value}
					onChange={handleChange}
					onChangeCommitted={handleChangeCommitted}
					valueLabelDisplay="off"
					color="secondary"
					sx={{
						mt: 1.5,
						width: 'calc(100% - 22px)',

						'.MuiSlider-thumb': {
							color: pepticColor ?? '#FFC400',
						},
						'.MuiSlider-track': {
							color: pepticColor ?? '#FFC400',
						},
					}}
				/>
			</Stack>
		</Stack>
	);
};

export default RangeFilter;
