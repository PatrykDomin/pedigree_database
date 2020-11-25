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
  },
  filtersAndBtn: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(8),
  },
  children: {
    width: '100%',
    minHeight: CHILDREN_MIN_HEIGHT,
  },
  filters: {
    '& > div': {
      marginRight: theme.spacing(4),
    },
  },
}));
