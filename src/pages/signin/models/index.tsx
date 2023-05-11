import { $authApi } from 'shared/api'

export interface IUser {
  email: string
  password: string
}

export const SignIn = async (data: any) => {
  const response = await $authApi.post('/Users/SignIn', data)
  console.log(response)
}
