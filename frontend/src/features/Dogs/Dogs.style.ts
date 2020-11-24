import { makeStyles, Theme } from '@material-ui/core';

const ROW_MIN_WIDTH = 916;

export default makeStyles((theme: Theme) => ({
  table: {
    border: `2px solid ${theme.palette.primary.dark}`,
    boxShadow: `-4px 4px 8px ${theme.palette.primary.dark}, 4px -4px 8px ${theme.palette.primary.light}`,
    borderRadius: 12,
    padding: theme.spacing(8, 2),
    maxWidth: '100%',
    overflow: 'auto',
  },
  row: {
    minWidth: ROW_MIN_WIDTH,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(4, 0, 0),
    '& svg': {
      color: theme.palette.secondary.main,
    },
  },
}));
