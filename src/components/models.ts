export interface User {
  id: number,
  cpf: string
  firstName: string,
  lastName: string,
  birthdate: string | Date,
  email: string,
  gender: string
}

export interface UserData {
  id: number,
  cpf: string
  first_name: string,
  last_name: string,
  birthdate: string | Date,
  email: string,
  gender: string
}

export interface Response<D> {
  readonly statusCode: number
  readonly data: D
 }
