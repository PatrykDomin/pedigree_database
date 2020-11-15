import React, { useCallback, useEffect, useState } from 'react'
// import useStyles from './Breeding.style'
import ListWrapper from '../../shared/ListWrapper'
import { Button } from '@material-ui/core'
import { getAllBreedings } from './Breeding.utils'
import { IBreeding } from '../../core/apiTypes/apiType'

export const Breeding: React.FC = () => {
  // const styles = useStyles()
  const [breedings, setBreedings] = useState<IBreeding[]>([])

  const getBreedings = useCallback(async () => {
    const breedings = await getAllBreedings()
    setBreedings(breedings)
  }, [])

  useEffect(() => {
    getBreedings()
  }, [getBreedings])

  return (
    <ListWrapper
      title="Lista hodowli"
      additionalBtn={
        <Button color="secondary" variant="contained">
          Przykładowy
        </Button>
      }
    >
      {breedings.map(el => {
        return (
          <div>
            {el.name} {el.breeder}
            <ul>
              {el.dogs?.map(dog => {
                return <li>{dog.name}</li>
              })}
            </ul>
          </div>
        )
      })}
    </ListWrapper>
  )
}
