import { Router } from 'express'
import { getAllDogs, addDog, IDogRequest } from '../services/dog'

const dogRouter = Router()

dogRouter.get('/dog', async (req, res) => {
  const dogs = await getAllDogs()
  if (dogs) {
    res.status(200).json(dogs)
  } else {
    res.status(204).json({ message: 'No dogs' })
  }
})

dogRouter.post('/dog', async (req, res) => {
  const { body }: { body: IDogRequest } = req
  const { pkr, name, pedigreeName, litter, breedingName } = body
  if (pkr && name && pedigreeName && litter && breedingName) {
    await addDog(body)
    res.status(200).json({ message: 'Dodano psa' })
  } else {
    res.status(400).json({ message: 'empty body' })
  }
})

export { dogRouter }
