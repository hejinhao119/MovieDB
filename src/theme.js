import { createMuiTheme } from '@material-ui/core/styles'

// Define responsive mode breakpoint
const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
});

export default theme;