import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  cell: {
    maxWidth: '100%',
    color: theme.palette.text.primary,
    border: 'none',
  },
  header: {
    fontSize: 12,
    opacity: 0.85,
  },
  anchor: {
    fontSize: 14,
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));
