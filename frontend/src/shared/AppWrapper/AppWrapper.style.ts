import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  appWrapper: {
    minHeight: '100vh',
    minWidth: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  children: {
    padding: theme.spacing(9),
  },
}));
