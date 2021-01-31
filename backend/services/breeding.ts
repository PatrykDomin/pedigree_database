import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getBreedings = async () => {
  const breedings = await prisma.breeding.findMany({
    include: {
      dogs: true,
    },
  });
  return breedings;
};

const getBreedingByName = async (name: string) => {
  const breedings = await prisma.breeding.findUnique({
    include: {
      dogs: true,
    },
    where: {
      name,
    },
  });
  return breedings;
};

const addNewBreeding = async (webPage: string, name: string) => {
  await prisma.breeding.create({
    data: {
      webPage,
      name,
    },
  });
};

export { getBreedings, getBreedingByName, addNewBreeding };
