import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyList: {
    width: '100%',
    margin: theme.spacing(8, 0, 0),
    textAlign: 'center',
    fontSize: 19,
    opacity: 0.8,
    color: theme.palette.text.primary,
  },
}));
