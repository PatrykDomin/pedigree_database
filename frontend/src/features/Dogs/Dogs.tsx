import React, { useState, useCallback, useEffect } from 'react'
import useStyles from './Dogs.style'
import { ListWrapper } from '../../shared/ListWrapper'
import { Button, Collapse, Grid } from '@material-ui/core'
import { DataCell } from '../../shared/DataCell'
import { IDog } from '../../core/apiTypes/apiType'
import { getAllDogs } from './Dogs.utils'
import { useLoadingState } from '../../hooks/loadingHook'

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

  const isLoading = useLoadingState(!Boolean(dogs), 800)

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
        <Collapse in={!isLoading && Boolean(dogs)}>
          {dogs.map(({ pkr, name, mom, dad, breeding }) => {
            return (
              <Grid key={pkr} container direction="row" className={styles.row}>
                <Grid item xs={2}>
                  <DataCell header="Nr PKR" content={pkr.toString()} />
                </Grid>
                <Grid item xs={3}>
                  <DataCell header="Imię" content={name} />
                </Grid>
                <Grid item xs={2}>
                  <DataCell header="Matka" content={mom?.name || '—'} />
                </Grid>
                <Grid item xs={2}>
                  <DataCell header="Ojciec" content={dad?.name || '—'} />
                </Grid>
                <Grid item xs={2}>
                  <DataCell header="Hodowla" content={breeding.name} />
                </Grid>
              </Grid>
            )
          })}
        </Collapse>
      </Grid>
    </ListWrapper>
  )
}
