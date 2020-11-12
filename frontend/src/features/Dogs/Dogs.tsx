import React, { useMemo } from 'react'
import useStyles from './Dogs.style'
import ListWrapper from '../../shared/ListWrapper'
import { Button, Grid } from '@material-ui/core'
import dogsListData from '../../dogs.json'
import DataCell from '../../shared/DataCell'

export const Dogs: React.FC = () => {
  const styles = useStyles()

  const dogsList = useMemo(() => {
    return dogsListData.dogs
  }, [])

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
        {dogsList.map(({ pkr, name, parent1, parent2, breeding }, i) => {
          return (
            <Grid container direction="row" className={styles.row}>
              <Grid item xs={1}>
                <DataCell header="Nr PKR" content={pkr.toString()} />
              </Grid>
              <Grid item xs={3}>
                <DataCell header="Imię" content={name} />
              </Grid>
              <Grid item xs={3}>
                <DataCell header="Ojciec" content={parent1 || '-'} />
              </Grid>
              <Grid item xs={3}>
                <DataCell header="Matka" content={parent2 || '-'} />
              </Grid>
              <Grid item xs={2}>
                <DataCell header="Hodowla" content={breeding} />
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </ListWrapper>
  )
}
