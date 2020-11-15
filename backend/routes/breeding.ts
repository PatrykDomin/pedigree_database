import { Router } from 'express'
import {
  addNewBreeding,
  getBreedingByName,
  getBreedings,
} from '../services/breeding'

const breedingRouter = Router()

breedingRouter.get('/breeding', async (req, res) => {
  const breedings = await getBreedings()
  res.status(200).json(breedings)
})

breedingRouter.get('/breeding/:name', async (req, res) => {
  const { params } = req
  const breeding = await getBreedingByName(params.name)
  res.status(200).json(breeding)
})

breedingRouter.post('/breeding', async (req, res) => {
  const { body } = req
  if (body?.breeder && body?.name) {
    await addNewBreeding(body.breeder, body.name)
    res.status(200).json({ message: 'Dodano hodowlę' })
  } else {
    res.status(400).json({ message: 'Empty body' })
  }
})

export { breedingRouter }
