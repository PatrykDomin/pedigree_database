import { Breeding } from '@prisma/client';
import { Router } from 'express';
import {
  addNewBreeding,
  getBreedingByName,
  getBreedings,
} from '../services/breeding';

const breedingRouter = Router();

breedingRouter.get('/breeding', async (req, res) => {
  try {
    const breedings = await getBreedings();
    res.status(200).json(breedings);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

breedingRouter.get('/breeding/:name', async (req, res) => {
  const { params } = req;
  try {
    const breeding = await getBreedingByName(params.name);
    res.status(200).json(breeding);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

breedingRouter.post('/breeding', async (req, res) => {
  const { body } = req;
  if (body?.webPage && body?.name) {
    try {
      await addNewBreeding(body.webPage, body.name);
      res.status(201).json({ message: 'Dodano hodowlę' });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } else {
    res.status(404).json({ message: 'Puste dane' });
  }
});

export { breedingRouter };
