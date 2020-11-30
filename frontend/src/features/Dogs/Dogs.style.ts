import { makeStyles, Theme } from '@material-ui/core';

const ROW_MIN_WIDTH = 1100;

export default makeStyles((theme: Theme) => ({
  table: {
    borderRadius: 12,
    padding: theme.spacing(0, 0, 3),
    maxWidth: '100%',
    overflowX: 'auto',

    overflowY: 'hidden',
    transition: 'height 0.4s ease-in-out',
  },
  emptyList: {
    margin: theme.spacing(8, 0, 0),
    textAlign: 'center',
    fontSize: 19,
    opacity: 0.8,
    color: theme.palette.text.primary,
  },
  row: {
    minWidth: ROW_MIN_WIDTH,
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(1),
  },
  treeBtn: {
    alignSelf: 'center',
    width: 44,
    height: '100%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      width: '100%',
      fill: theme.palette.secondary.main,
      transition: 'fill 0.2s ease-in-out, transform 0.2s ease-in-out',
    },
    '&:hover': {
      '& svg': {
        transform: 'scale(1.08)',
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
