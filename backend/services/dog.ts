import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AddDogRequest {
  pkr: string;
  birth: Date;
  sex: boolean;
  name: string;
  pedigreeName: string;
  litter: string;
  breedingName: string;
  momPkr?: string;
  dadPkr?: string;
}

export interface UpdateDogRequest {
  name: string;
  momPkr?: string;
  dadPkr?: string;
}

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
  const dog = await prisma.dog.findOne({
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
  return dog;
};

const updateDog = async (pkr: string, updateData: UpdateDogRequest) => {
  const { name, momPkr, dadPkr } = updateData;
  try {
    await prisma.dog.update({
      where: {
        pkr,
      },
      data: {
        name: name,
        mom: momPkr ? { connect: { pkr: momPkr } } : undefined,
        dad: dadPkr ? { connect: { pkr: dadPkr } } : undefined,
      },
    });
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
      litter,
      breeding: { connect: { name: breedingName } },
      mom: momPkr ? { connect: { pkr: momPkr } } : undefined,
      dad: dadPkr ? { connect: { pkr: dadPkr } } : undefined,
    },
  });
};

export { getAllDogs, getDogWithChildren, updateDog, addDog };
