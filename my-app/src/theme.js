import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let darkTheme = createTheme({
	palette: {
		type: 'dark',
	},
});

darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
