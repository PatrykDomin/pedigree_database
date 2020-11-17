import React from 'react'
import { Button, useTheme, Theme } from '@material-ui/core'
import { DataCell } from '../../../shared/DataCell'
import useStyles from './SingleBreedings.style'

export const SingleBreeding: React.FC<{ name: string; breeder: string }> = ({
  name,
  breeder,
}) => {
  const styles = useStyles()
  const theme = useTheme<Theme>()

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.img} />
        <DataCell
          header="Hodowla"
          content={name}
          color={theme.palette.common.white}
          customMargin={theme.spacing(0)}
        />
      </div>
      <DataCell
        header="Hodowca"
        content={breeder}
        color={theme.palette.common.white}
        customMargin={theme.spacing(0, 2, 0, 0)}
      />
      <Button className={styles.btn} variant="contained">
        Zobacz hodowlę
      </Button>
    </div>
  )
}
