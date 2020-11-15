import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface IDogRequest {
  pkr: string
  sex: boolean
  name: string
  pedigreeName: string
  litter: string
  breedingName: string
  momPkr?: string
  dadPkr?: string
}

const getAllDogs = async () => {
  const dogs = await prisma.dog.findMany({
    include: { breeding: true },
  })
  return dogs
}

const addDog = async (dogData: IDogRequest) => {
  const {
    pkr,
    sex,
    name,
    pedigreeName,
    litter,
    breedingName,
    momPkr,
    dadPkr,
  } = dogData
  await prisma.dog.create({
    data: {
      pkr,
      sex,
      name,
      pedigreeName,
      litter,
      breeding: { connect: { name: breedingName } },
      mom: momPkr ? { connect: { pkr: momPkr } } : undefined,
      dad: dadPkr ? { connect: { pkr: dadPkr } } : undefined,
    },
  })
}

export { getAllDogs, addDog }
