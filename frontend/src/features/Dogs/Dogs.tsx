import React, { useEffect, useState } from 'react'
import useStyles from './Dogs.style'
import { ListWrapper } from '../../shared/ListWrapper'
import { Button, Fade, Grid } from '@material-ui/core'
import { DataCell } from '../../shared/DataCell'
import { isEmpty } from 'ramda'
import { useStore } from '../../core/store/store'
import { AddDogForm } from './AddDogForm'
import { format, parseISO } from 'date-fns'
import Pagination from '@material-ui/lab/Pagination/Pagination'
import { IDog } from '../../core/apiTypes/apiType'

const DOGS_PER_PAGE = 2

export const Dogs: React.FC = () => {
  const styles = useStyles()

  const [openModal, setOpenModal] = useState(false)
  const closeModal = () => setOpenModal(false)

  const dogs = useStore(state => state.dogs)
  const getDogs = useStore(state => state.fetchDogs)

  const [startingIndex, setStartingIndex] = useState(0)
  const [dogsToDisplay, setDogsToDisplay] = useState<IDog[]>([])

  useEffect(() => {
    if (isEmpty(dogs)) {
      getDogs()
    }
  }, [getDogs, dogs, startingIndex, setDogsToDisplay])

  useEffect(() => {
    setDogsToDisplay(
      dogs.slice(
        startingIndex * DOGS_PER_PAGE,
        startingIndex * DOGS_PER_PAGE + DOGS_PER_PAGE
      )
    )
  }, [startingIndex, dogs, setDogsToDisplay])

  return (
    <ListWrapper
      title="Lista psów"
      additionalBtn={
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setOpenModal(true)}
        >
          Dodaj psa
        </Button>
      }
    >
      <Grid container direction="column" className={styles.table}>
        <Fade in={!isEmpty(dogs)} {...{ timeout: 800 }}>
          <div>
            {dogsToDisplay.map(({ pkr, birth, name, mom, dad, breeding }) => {
              return (
                <Grid
                  key={pkr}
                  container
                  direction="row"
                  className={styles.row}
                >
                  <Grid item xs={2}>
                    <DataCell header="Nr PKR" content={pkr} />
                  </Grid>
                  <Grid item xs={2}>
                    <DataCell
                      header="Data narodzin"
                      content={format(parseISO(birth), 'dd.MM.yyyy')}
                    />
                  </Grid>
                  <Grid item xs={2}>
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
          </div>
        </Fade>
      </Grid>
      <Pagination
        className={styles.pagination}
        color="secondary"
        count={Math.ceil(dogs.length / DOGS_PER_PAGE)}
        page={startingIndex + 1}
        onChange={(e, page) => {
          setStartingIndex(page - 1)
        }}
      />
      <AddDogForm open={openModal} close={closeModal} />
    </ListWrapper>
  )
}
