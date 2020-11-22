import React from 'react'
import { Theme, makeStyles } from '@material-ui/core'
import { TextField } from '../Input/Input'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'baseline',
    height: 60,
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  label: {
    fontSize: 18,
    width: 200,
    minWidth: 200,
  },
}))

interface CustomAutocompleteProps {
  label: string
}

export const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  label,
}) => {
  const styles = useStyles()
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <TextField type="date" />
    </div>
  )
}
