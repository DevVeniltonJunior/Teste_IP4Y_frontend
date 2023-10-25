import axios from 'axios'
import { UserData, Response } from './models'

export class Data {
  static async create (data: UserData): Promise<Response<UserData>> {
    return await axios.post('http://localhost:3000/user', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static async update (data: Partial<UserData>): Promise<void> {
    return await axios.put('http://localhost:3000/user', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static async delete (id: number): Promise<Response<UserData>> {
    return await axios.delete('http://localhost:3000/user', { params: { id } })
  }

  static async get (): Promise<Response<UserData[]>> {
    return await axios.get('http://localhost:3000/user')
  }
}
