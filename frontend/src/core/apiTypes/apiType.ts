export interface IDog {
  id: number;
  pkr: string;
  birth: string;
  sex: boolean;
  litter: string;
  name: string;
  pedigreeName: string;
  momChildren?: IDog[];
  dadChildren?: IDog[];
  mom?: IDog | null;
  momId?: number | null;
  dad?: IDog | null;
  dadId?: number | null;
  breedingId: number;
  breeding: IBreeding;
}

export interface IBreeding {
  id: number;
  name: string;
  breeder: string;
  dogs?: IDog[];
}
