export interface IDog {
  id: number
  pkr: string
  sex: boolean
  litter: string
  name: string
  pedigreeName: string
  momId?: string
  dadId?: string
  breedingId: number
  breeding: IBreeding
}

export interface IBreeding {
  id: number
  name: string
  breeder: string
  dogs?: IDog[]
}
