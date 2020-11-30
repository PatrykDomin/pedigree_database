import { makeStyles, Theme } from '@material-ui/core';

const IMG_SIZE = 72;

export default makeStyles((theme: Theme) => ({
  card: {
    width: '100%',
    minHeight: 160,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: 25,
    margin: '0 auto',
    padding: theme.spacing(6),
    backgroundColor: theme.palette.secondary.dark,
    boxShadow: `-4px 3px 8px ${theme.palette.primary.dark}`,
    border: '2px solid transparent',
  },
  selectedCard: {
    border: `2px solid ${theme.palette.common.white}`,
  },
  litterCard: {
    padding: theme.spacing(3),
  },
  title: {
    alignSelf: 'center',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
  },
  topRow: {
    marginBottom: theme.spacing(4),
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
  btnWrapper: {
    marginTop: theme.spacing(2),
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  btn: {
    padding: 0,
    height: 36,
    width: '100%',
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(4, 0, 0),
    },
  },
  btnLitter: {
    padding: 0,
    height: 36,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(4, 0, 0),
    },
  },
  litter: {
    marginBottom: theme.spacing(2),
  },
}));
