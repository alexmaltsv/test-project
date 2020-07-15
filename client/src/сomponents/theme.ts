import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h5: {
        fontWeight: 'bold',
      },
      h6: {
        fontWeight: 'bold',
      },
    },

    MuiPaper: {
      root: {
        color: 'inherit',
      },
    },
  },
});

export default theme;
