import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  cell: {
    color: theme.palette.text.primary,
    border: 'none',
  },
  header: {
    fontSize: 12,
    opacity: 0.85,
  },
  content: {
    fontSize: 20,
  },
}))
