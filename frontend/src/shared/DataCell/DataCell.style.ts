import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  cell: {
    color: theme.palette.text.primary,
    border: 'none',
    margin: theme.spacing(2, 4, 2, 2),
  },
  header: {
    fontSize: 12,
    opacity: 0.75,
  },
  content: {
    fontSize: 20,
  },
}))
