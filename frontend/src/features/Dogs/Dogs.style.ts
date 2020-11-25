import { makeStyles, Theme } from '@material-ui/core';

const ROW_MIN_WIDTH = 1100;

export default makeStyles((theme: Theme) => ({
  table: {
    borderRadius: 12,
    padding: theme.spacing(0, 2),
    maxWidth: '100%',
    overflowX: 'auto',

    overflowY: 'hidden',
    transition: 'height 0.4s ease-in-out',
  },
  row: {
    minWidth: ROW_MIN_WIDTH,
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(1),
  },
  treeBtn: {
    alignSelf: 'center',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      height: '68%',
      width: 'auto',
      fill: theme.palette.secondary.main,
      transition: 'fill 0.2s ease-in-out',
    },
    '&:hover': {
      '& svg': {
        fill: theme.palette.secondary.dark,
      },
    },
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
