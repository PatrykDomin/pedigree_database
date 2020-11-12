import React from 'react'
import useStyles from './Breeding.style'
import ListWrapper from '../../shared/ListWrapper'
import { Button } from '@material-ui/core'
import dogsListData from '../../dogs.json'

export const Breeding: React.FC = () => {
  const styles = useStyles()

  const breedingArr = Array.from(
    new Set(dogsListData.dogs.map(dog => dog.breeding))
  )

  return (
    <ListWrapper
      title="Lista hodowli"
      additionalBtn={
        <Button color="secondary" variant="contained">
          Przykładowy
        </Button>
      }
    >
      {breedingArr}
    </ListWrapper>
  )
}
