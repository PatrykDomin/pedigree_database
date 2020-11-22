import React, { useEffect, useState } from 'react'
import useStyles from './Breeding.style'
import { ListWrapper } from '../../shared/ListWrapper'
import { Button, Fade, Grid } from '@material-ui/core'
import { SingleBreeding } from './SingleBreeding'
import { useStore } from '../../core/store/store'
import { isEmpty } from 'ramda'
import { AddBreedingForm } from './AddBreedingForm'

export const Breeding: React.FC = () => {
  const styles = useStyles()

  const [openModal, setOpenModal] = useState(false)
  const closeModal = () => setOpenModal(false)

  const breedings = useStore(state => state.breedings)
  const getBreedings = useStore(state => state.fetchBreedings)

  useEffect(() => {
    if (isEmpty(breedings)) {
      getBreedings()
    }
  }, [getBreedings, breedings])

  return (
    <ListWrapper
      title="Lista hodowli"
      additionalBtn={
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setOpenModal(true)}
        >
          Dodaj hodowlę
        </Button>
      }
    >
      <Fade in={!isEmpty(breedings)} {...{ timeout: 800 }}>
        <Grid
          container
          justify="flex-end"
          spacing={6}
          className={styles.wrapper}
        >
          {breedings.map(el => {
            return (
              <Grid key={el.id} item xs={12} md={6} lg={4}>
                <SingleBreeding name={el.name} breeder={el.breeder} />
              </Grid>
            )
          })}
        </Grid>
      </Fade>
      <AddBreedingForm open={openModal} close={closeModal} />
    </ListWrapper>
  )
}
