import { makeStyles, Theme } from '@material-ui/core';

const LIST_WRAPPER_MAX_WIDTH = 1200;
const CHILDREN_MIN_HEIGHT = 200;

export default makeStyles((theme: Theme) => ({
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: LIST_WRAPPER_MAX_WIDTH,
    height: '100%',
  },
  header: {
    marginBottom: theme.spacing(8),
    fontSize: 36,
    letterSpacing: 0.8,
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4),
    },
  },
  filtersAndBtn: {
    minHeight: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginBottom: theme.spacing(0),
    },
  },
  filters: {
    display: 'flex',
    '& > div': {
      margin: theme.spacing(1, 4, 1, 0),
      maxWidth: 300,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      '& > div': {
        width: '100%',
        maxWidth: '100%',
      },
    },
  },
  btn: {
    minWidth: 152,
    '& button': {
      padding: 0,
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(4, 0, 5),
    },
  },
  children: {
    width: '100%',
    minHeight: CHILDREN_MIN_HEIGHT,
  },
}));
