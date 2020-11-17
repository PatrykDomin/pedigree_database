export interface IDog {
  id: number
  pkr: string
  sex: boolean
  litter: string
  name: string
  pedigreeName: string
  mom?: IDog
  dad?: IDog
  breedingId: number
  breeding: IBreeding
}

export interface IBreeding {
  id: number
  name: string
  breeder: string
  dogs?: IDog[]
}
