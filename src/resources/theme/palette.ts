import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
	return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
	0: '#FFFFFF',
	100: '#F9FAFB',
	200: '#F4F6F8',
	300: '#DFE3E8',
	400: '#C4CDD5',
	500: '#919EAB',
	600: '#637381',
	700: '#454F5B',
	800: '#212B36',
	900: '#161C24',
	500_8: alpha('#919EAB', 0.08),
	500_12: alpha('#919EAB', 0.12),
	500_16: alpha('#919EAB', 0.16),
	500_24: alpha('#919EAB', 0.24),
	500_32: alpha('#919EAB', 0.32),
	500_48: alpha('#919EAB', 0.48),
	500_56: alpha('#919EAB', 0.56),
	500_80: alpha('#919EAB', 0.8),
};

const PRIMARY = {
	lighter: '#FE5196',
	light: '#2196F3',
	main: '#0B071B',
	dark: '#AB47BC',
	darker: '#673AB7',
	contrastText: '#fff',
};
const SECONDARY = {
	lighter: '#D6E4FF',
	light: '#726E83',
	main: '#433D60',
	dark: '#4198EF',
	darker: '#091A7A',
	contrastText: '#fff',
};
const INFO = {
	lighter: '#F4F4F2',
	light: '#E8E8E8',
	main: '#BBBFCA',
	dark: '#5f6f85',
	darker: '#495464',
	contrastText: '#fff',
};

const SUCCESS = {
	lighter: '#E9FCD4',
	light: '#AAF27F',
	main: '#0BAAC1',
	dark: '#06768D',
	darker: '#08660D',
	contrastText: GREY[800],
};
const WARNING = {
	lighter: '#FFF7CD',
	light: '#FFE16A',
	main: '#FFC107',
	dark: '#B78103',
	darker: '#7A4F01',
	contrastText: GREY[800],
};
const ERROR = {
	lighter: '#FFE7D9',
	light: '#FFA48D',
	main: '#EC407A',
	dark: '#B72136',
	darker: '#7A0C2E',
	contrastText: '#fff',
};

const GRADIENTS = {
	// primary: createGradient(PRIMARY.light, PRIMARY.main),
	// primary: `linear-gradient(180deg, ${PRIMARY.main} 0%, ${PRIMARY.light} 70.6%, ${PRIMARY.lighter} 100%)`,
	// info: createGradient(INFO.light, INFO.main),
	// success: createGradient(SUCCESS.light, SUCCESS.main),
	primary: 'linear-gradient(90deg, #419AF2 0%, #3945F0 59.9%, #503EE6 100%)',
	service: 'linear-gradient(90deg, rgba(65, 154, 242, 0.2) 0%, rgba(57, 69, 240, 0.2) 59.9%, rgba(80, 62, 230, 0.2) 100%), #FFFFFF',
	// eslint-disable-next-line max-len
	secondary: 'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), #311B92',
	// eslint-disable-next-line max-len
	info: 'linear-gradient(90deg, #419AF2 0%, #3945F0 27.68%, #503EE6 36.12%, #642CEC 43.1%, #9A39CB 58.89%, #DC43A3 75.41%, #F8B3A8 100%)',
	success: 'linear-gradient(90deg, #E35EA4 0%, #E35EA4 39.06%, #EE8CA6 100%)',
	warning: createGradient(WARNING.light, WARNING.main),
	error: createGradient(ERROR.light, ERROR.main),
	border: 'linear-gradient(87.81deg, rgba(65, 152, 239, 0.3) 54.94%, rgba(65, 152, 239, 0) 114.34%), linear-gradient(0deg, #FFFFFF, #FFFFFF)',
	textDark: 'linear-gradient(0deg, #673AB7, #673AB7), linear-gradient(0deg, rgba(61, 90, 254, 0.4), rgba(61, 90, 254, 0.4)), linear-gradient(0deg, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0.76))',
};

const CHART_COLORS = {
	violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
	blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
	green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
	yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
	red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const TEXT = {
	primary: '#433D60',
	secondary: '#726E83',
	disabled: GREY[500],
};

const palette = {
	common: { black: '#000', white: '#FFFFFF' },
	primary: { ...PRIMARY },
	secondary: { ...SECONDARY },
	info: { ...INFO },
	success: { ...SUCCESS },
	warning: { ...WARNING },
	error: { ...ERROR },
	grey: GREY,
	gradients: GRADIENTS,
	chart: CHART_COLORS,
	divider: GREY[500_24],
	// text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
	text: { ...TEXT },
	background: {
		paper: '#fff', default: '#313140', neutral: GREY[200], main: '#FDFAF9',
	},
	action: {
		active: GREY[600],
		hover: GREY[500_8],
		selected: GREY[500_16],
		disabled: GREY[500_80],
		disabledBackground: GREY[500_24],
		focus: GREY[500_24],
		hoverOpacity: 0.08,
		disabledOpacity: 0.48,
	},
};

export default palette;
