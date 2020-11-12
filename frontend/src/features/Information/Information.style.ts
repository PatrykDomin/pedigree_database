import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  information: {
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(10, 12),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:last-child': {
      marginTop: theme.spacing(4),
      flexDirection: 'row-reverse',
    },
    '& img': {
      width: '36%',
      borderRadius: 16,
      boxShadow: `-6px 6px 4px ${theme.palette.primary.dark}`,
    },
  },
  content: {
    width: '60%',
    padding: theme.spacing(0, 3),
    '& h2': {
      fontSize: 28,
      marginBottom: theme.spacing(3),
    },
    '& p': {
      fontSize: 14,
      letterSpacing: 0.8,
    },
  },
  image: {
    width: '32%',
    minWidth: 300,
    height: 280,
    borderRadius: 16,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
}))
