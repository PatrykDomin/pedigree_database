import React, { useState, useCallback, useEffect } from 'react'
import useStyles from './Dogs.style'
import ListWrapper from '../../shared/ListWrapper'
import { Button, Grid } from '@material-ui/core'
import DataCell from '../../shared/DataCell'
import { IDog } from '../../core/apiTypes/apiType'
import { getAllDogs } from './Dogs.utils'

export const Dogs: React.FC = () => {
  const styles = useStyles()

  const [dogs, setDogs] = useState<IDog[]>([])

  const getDogs = useCallback(async () => {
    const dogs = await getAllDogs()
    setDogs(dogs)
  }, [])

  useEffect(() => {
    getDogs()
  }, [getDogs])

  return (
    <ListWrapper
      title="Lista psów"
      additionalBtn={
        <Button color="secondary" variant="contained">
          Przykładowy
        </Button>
      }
    >
      <Grid container direction="column" className={styles.table}>
        {dogs.map(({ pkr, name, momId, dadId, breeding }) => {
          return (
            <Grid key={pkr} container direction="row" className={styles.row}>
              <Grid item xs={2}>
                <DataCell header="Nr PKR" content={pkr.toString()} />
              </Grid>
              <Grid item xs={3}>
                <DataCell header="Imię" content={name} />
              </Grid>
              <Grid item xs={2}>
                <DataCell header="Matka" content={momId || '-'} />
              </Grid>
              <Grid item xs={2}>
                <DataCell header="Ojciec" content={dadId || '-'} />
              </Grid>
              <Grid item xs={2}>
                <DataCell header="Hodowla" content={breeding.name} />
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </ListWrapper>
  )
}
