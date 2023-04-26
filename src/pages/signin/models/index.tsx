import $api from 'shared/api'

export interface IUser {
  email: string
  password: string
}

export const SignIn = async (data: any) => {
  const response = await $api.post('/Users/SignIn', data)
  console.log(response)
}
