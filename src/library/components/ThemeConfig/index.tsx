import React, { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import palette from 'resources/theme/palette';

interface IThemeConfig {
  children: React.ReactElement;
}

const ThemeConfig = ({ children }: IThemeConfig) => {
	const themeOptions = useMemo(
		() => ({
			palette,
		}),
		[],
	);

	const theme = createTheme(themeOptions);
	// theme.components = componentsOverride(theme as CustomTheme);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

export default ThemeConfig;
