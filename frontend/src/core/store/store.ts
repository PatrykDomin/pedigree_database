import create from 'zustand';

import { IBreeding, IDog } from '../apiTypes/apiType';

type StoreState = {
  dogs: IDog[];
  breedings: IBreeding[];
  fetchDogs: () => Promise<void>;
  fetchBreedings: () => Promise<void>;
};

export const useStore = create<StoreState>(set => ({
  dogs: [],
  breedings: [],
  fetchDogs: async () => {
    const response = await fetch('http://localhost:4200/dog');
    const dogs: IDog[] = await response.json();
    set(() => ({ dogs }));
  },
  fetchBreedings: async () => {
    const response = await fetch('http://localhost:4200/breeding');
    const breedings: IBreeding[] = await response.json();
    set(() => ({ breedings }));
  },
}));
