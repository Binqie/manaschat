import { $api } from 'shared/api'

export const DeletePostRequest = async (id: number) => {
  const response = await $api.delete(`/Posts/Delete?id=${id}`)
  return response
}
