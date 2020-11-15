import { IDog } from '../../core/apiTypes/apiType'

export const getAllDogs = async (): Promise<IDog[]> => {
  const response = await fetch('http://localhost:4200/dog')
  return response.json()
}
