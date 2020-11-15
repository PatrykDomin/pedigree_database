import { IBreeding } from '../../core/apiTypes/apiType'

export const getAllBreedings = async (): Promise<IBreeding[]> => {
  const response = await fetch('http://localhost:4200/breeding')
  return response.json()
}
