import { $api } from 'shared/api'

export const SendExecuteChangeGroupRequest = async (id: number) => {
  return await $api.put(`/Requests/ExecuteChangeGroupRequest?id=${id}`)
}

export const SendDeleteChangeGroupRequest = async (id: number) => {
  return await $api.delete(`/Requests/Delete?id=${id}`)
}

export const SendActivateUserRequest = async (email: string) => {
  return await $api.get(`/Users/Activate?email=${email}`)
}

export const SendDeleteUserRequest = async (id: number) => {
  return await $api.delete(`/Users/Delete?id=${id}`)
}

export const GetRequests = async () => {
  return await $api.get('/Requests/GetAll')
}

export const GetUsers = async () => {
  return await $api.get('/Users/GetAll')
}
