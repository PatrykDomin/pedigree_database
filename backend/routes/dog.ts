import { Router } from 'express';
import {
  getAllDogs,
  addDog,
  IDogRequest,
  getDogWithChildren,
} from '../services/dog';
import { groupBy } from 'ramda';
import { Dog } from '@prisma/client';

const dogRouter = Router();

const groupByMom = groupBy(
  (
    dog: Dog & {
      mom: Dog | null;
      dad: Dog | null;
    }
  ) => dog.mom?.name ?? ''
);
const groupByDad = groupBy(
  (
    dog: Dog & {
      mom: Dog | null;
      dad: Dog | null;
    }
  ) => dog.dad?.name ?? ''
);

dogRouter.get('/dog', async (req, res) => {
  const dogs = await getAllDogs();
  if (dogs) {
    res.status(200).json(dogs);
  } else {
    res.status(204).json({ message: 'No dogs' });
  }
});

dogRouter.get('/dog/:pkr', async (req, res) => {
  const dog = await getDogWithChildren(req.params.pkr);
  if (dog) {
    const children = dog.sex ? dog.dadChildren : dog.momChildren;
    const groupedChildren = Object.values(
      dog.sex ? groupByMom(children) : groupByDad(children)
    ).map(group => ({
      parent: ((dog.sex ? group[0].mom?.name : group[0].dad?.name) ??
        'Nie podano') as string,
      children: group.sort((a, b) =>
        a.birth > b.birth ? 1 : a.birth < b.birth ? -1 : 0
      ),
    }));
    res.status(200).json({ dog: dog, litters: groupedChildren });
  } else {
    res.status(400);
  }
});

dogRouter.post('/dog', async (req, res) => {
  const { body }: { body: IDogRequest } = req;
  const { pkr, birth, name, pedigreeName, litter, breedingName } = body;
  if (pkr && name && birth && pedigreeName && litter && breedingName) {
    await addDog(body);
    res.status(200).json({ message: 'Dodano psa' });
  } else {
    res.status(400).json({ message: 'empty body' });
  }
});

export { dogRouter };
