export interface DogType {
  id: number;
  pkr: string;
  birth: string;
  sex: boolean;
  litter: string;
  name: string;
  pedigreeName: string;
  momChildren?: DogType[];
  dadChildren?: DogType[];
  mom?: DogType | null;
  momId?: number | null;
  dad?: DogType | null;
  dadId?: number | null;
  breedingId: number;
  breeding: BreedingType;
}

export interface DogWithLittersType {
  dog: DogType;
  litters: {
    parent: DogType | null;
    children: { [index: string]: DogType[] };
  }[];
}

export interface BreedingType {
  id: number;
  name: string;
  breeder: string;
  dogs?: DogType[];
}
