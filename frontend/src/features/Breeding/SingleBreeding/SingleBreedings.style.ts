import { makeStyles, Theme } from '@material-ui/core';

const IMG_SIZE = 108;

export default makeStyles((theme: Theme) => ({
  card: {
    height: 280,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: 25,
    padding: theme.spacing(6),
    backgroundColor: theme.palette.secondary.dark,
    boxShadow: `-4px 3px 8px ${theme.palette.primary.dark}`,
  },
  topRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  img: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: IMG_SIZE,
    height: IMG_SIZE,
    minWidth: IMG_SIZE,
    minHeight: IMG_SIZE,
    borderRadius: 25,
    backgroundColor: theme.palette.secondary.light,
    marginRight: theme.spacing(4),
    '& svg': {
      width: IMG_SIZE - 24,
      height: IMG_SIZE - 24,
      minWidth: IMG_SIZE - 24,
      minHeight: IMG_SIZE - 24,
    },
  },
  btn: {
    padding: 0,
    height: 40,
    width: '100%',
  },
}));
