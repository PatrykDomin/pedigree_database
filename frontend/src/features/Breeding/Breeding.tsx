import React, { useEffect } from 'react'
import useStyles from './Breeding.style'
import { ListWrapper } from '../../shared/ListWrapper'
import { Button, Fade, Grid } from '@material-ui/core'
import { SingleBreeding } from './SingleBreeding'
import { useStore } from '../../core/store/store'
import { isEmpty } from 'ramda'

export const Breeding: React.FC = () => {
  const styles = useStyles()

  const breedings = useStore(state => state.breedings)
  const setBreedings = useStore(state => state.fetchBreedings)

  useEffect(() => {
    if (isEmpty(breedings)) {
      setBreedings()
    }
  }, [])

  console.log(breedings, new Date().getSeconds())

  return (
    <ListWrapper
      title="Lista hodowli"
      additionalBtn={
        <Button color="secondary" variant="contained">
          Przykładowy
        </Button>
      }
    >
      <Fade in={!isEmpty(breedings)} {...{ timeout: 800 }}>
        <Grid container spacing={6} className={styles.wrapper}>
          {breedings.map(el => {
            return (
              <Grid key={el.id} item xs={12} md={6} lg={4}>
                <SingleBreeding name={el.name} breeder={el.breeder} />
              </Grid>
            )
          })}
        </Grid>
      </Fade>
    </ListWrapper>
  )
}
