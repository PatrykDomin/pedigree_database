import create from 'zustand';

import { BreedingType, DogType } from '../apiTypes/apiType';

type StoreState = {
  dogs: DogType[];
  breedings: BreedingType[];
  fetchDogs: () => Promise<void>;
  fetchBreedings: () => Promise<void>;
};

export const useStore = create<StoreState>(set => ({
  dogs: [],
  breedings: [],
  fetchDogs: async () => {
    const response = await fetch('http://localhost:4200/dog');
    const dogs: DogType[] = await response.json();
    set(() => ({ dogs }));
  },
  fetchBreedings: async () => {
    const response = await fetch('http://localhost:4200/breeding');
    const breedings: BreedingType[] = await response.json();
    set(() => ({ breedings }));
  },
}));
