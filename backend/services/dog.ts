import { PrismaClient } from '@prisma/client';
import { id } from 'date-fns/locale';

const prisma = new PrismaClient();

export interface AddDogRequest {
  pkr: string;
  birth: Date;
  sex: boolean;
  name: string;
  pedigreeName: string;
  breed: string;
  litter: string;
  breedingName: string;
  momPkr?: string;
  dadPkr?: string;
}

export interface UpdateDogRequest {
  name: string;
  momPkr?: string;
  dadPkr?: string;
  phisical?: string;
}

// const changePKR = async () => {
//   const dogs = await prisma.dog.findMany();

//   dogs.map(async el => {
//     const zmienna = el.pkr.replace('X.', '.V');
//     await prisma.dog.update({
//       where: {
//         id: el.id,
//       },
//       data: {
//         pkr: zmienna,
//       },
//     });
//   });

//   return dogs;
// };

const getAllDogs = async () => {
  const dogs = await prisma.dog.findMany({
    include: {
      breeding: true,
      mom: true,
      dad: true,
    },
  });
  return dogs;
};

const getDogWithChildren = async (pkr: string) => {
  return await prisma.dog.findUnique({
    where: {
      pkr,
    },
    include: {
      breeding: true,
      mom: true,
      dad: true,
      momChildren: {
        include: { breeding: true, mom: true, dad: true },
      },
      dadChildren: {
        include: { breeding: true, mom: true, dad: true },
      },
    },
  });
};

const updateDog = async (pkr: string, updateData: UpdateDogRequest) => {
  const { name, momPkr, dadPkr, phisical } = updateData;
  try {
    await prisma.dog.update({
      where: {
        pkr,
      },
      data: {
        name,
        mom: momPkr ? { connect: { pkr: momPkr } } : undefined,
        dad: dadPkr ? { connect: { pkr: dadPkr } } : undefined,
        phisical,
      },
    });
  } catch (err) {
    console.log('err', err);
  }
};

const addTitle = async (pkr: string, title: string) => {
  try {
    const dog = await prisma.dog.findUnique({
      where: { pkr },
    });
    if (dog) {
      await prisma.dog.update({
        where: {
          pkr,
        },
        data: {
          titles: [...dog?.titles, title],
        },
      });
    }
  } catch (err) {
    console.log('err', err);
  }
};

const addDog = async (dogData: AddDogRequest) => {
  const {
    pkr,
    birth,
    sex,
    name,
    pedigreeName,
    breed,
    litter,
    breedingName,
    momPkr,
    dadPkr,
  } = dogData;
  await prisma.dog.create({
    data: {
      pkr,
      birth: new Date(birth),
      sex,
      name,
      pedigreeName,
      breed,
      litter,
      breeding: { connect: { name: breedingName } },
      mom: momPkr ? { connect: { pkr: momPkr } } : undefined,
      dad: dadPkr ? { connect: { pkr: dadPkr } } : undefined,
    },
  });
};

export {
  // changePKR,
  getAllDogs,
  getDogWithChildren,
  updateDog,
  addDog,
  addTitle,
};
