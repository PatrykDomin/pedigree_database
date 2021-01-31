import { Router } from 'express';
import {
  getAllDogs,
  addDog,
  AddDogRequest,
  updateDog,
  UpdateDogRequest,
  getDogWithChildren,
  addTitle,
  // changePKR,
} from '../services/dog';
import { groupBy } from 'ramda';
import { format, parseJSON } from 'date-fns';
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

const groupChildrenByDate = groupBy((dog: Dog) =>
  format(parseJSON(dog.birth), 'dd.MM.yyyy')
);

dogRouter.get('/dog', async (req, res) => {
  try {
    const dogs = await getAllDogs();
    const sortedDogs = dogs.sort((a, b) => (a.birth >= b.birth ? -1 : 1));
    if (sortedDogs) {
      res.status(200).json(sortedDogs);
    } else {
      res.status(204).json({ message: 'Nie znaleziono psów' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

dogRouter.get('/dog/:pkr', async (req, res) => {
  try {
    const dog = await getDogWithChildren(req.params.pkr);
    if (dog) {
      const children = dog.sex ? dog.dadChildren : dog.momChildren;
      const groupedChildren = Object.values(
        dog.sex ? groupByMom(children) : groupByDad(children)
      ).map(group => {
        return {
          parent: ((dog.sex ? group[0].mom : group[0].dad) ??
            null) as Dog | null,
          children: groupChildrenByDate(group),
        };
      });
      res.status(200).json({ dog, litters: groupedChildren });
    } else {
      res.status(204).json({ message: 'Nie znaleziono psa' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// dogRouter.put('/dog/changeLetterInPKR', async (req, res) => {
//   try {
//     await changePKR();
//     res.status(200).json({ message: 'Dog updated :)' });
//   } catch (err) {
//     console.log('err', err);
//   }
// });

dogRouter.put('/dog/:pkr', async (req, res) => {
  const { body }: { body: UpdateDogRequest } = req;
  try {
    await updateDog(req.params.pkr, body);
    res.status(204);
  } catch (err) {
    res.status(400).json({ message: `Nie udało się edytować, ${err}` });
  }
});

dogRouter.put('/dog/:pkr/title', async (req, res) => {
  try {
    await addTitle(req.params.pkr, req.body.title as string);
    res.status(204);
  } catch (err) {
    res.status(400).json({ message: `Nie udało się edytować, ${err}` });
  }
});

dogRouter.post('/dog', async (req, res) => {
  try {
    const { body }: { body: AddDogRequest } = req;
    const { pkr, birth, name, pedigreeName, litter, breedingName } = body;
    if (pkr && name && birth && pedigreeName && litter && breedingName) {
      await addDog(body);
      res.status(201).json({ message: 'Dodano psa' });
    } else {
      res.status(404).json({ message: 'Puste dane' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

export { dogRouter };
