import { useEffect, useState } from 'react'
import { $api } from 'shared/api'
import Drawer from 'widgets/drawer'
import CollapsibleTable from 'widgets/table'
import { IRequest, IUser } from 'shared/model/Types'

const GetRequests = async () => {
  return await $api.get('/Requests/GetAll')
}
const GetUsers = async () => {
  return await $api.get('/Users/GetAll')
}

const Requests = () => {
  const [requests, setRequests] = useState<IRequest[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [openedTab, setOpenedTab] = useState<string>('users')

  const handleUsersTabOpen = () => {
    setOpenedTab('users')
  }
  const handleRequestsTabOpen = () => {
    setOpenedTab('requests')
  }

  const getRequests = async () => {
    const response = await GetRequests()
    setRequests(response.data)
    console.log('requests', response.data)
  }
  const getUsers = async () => {
    const response = await GetUsers()
    setUsers(response.data)
    console.log('users', response.data)
  }

  useEffect(() => {
    getRequests()
    getUsers()
  }, [])

  return (
    <div>
      <Drawer
        handleUsersTabOpen={handleUsersTabOpen}
        handleRequestsTabOpen={handleRequestsTabOpen}
      >
        <CollapsibleTable
          data={openedTab === 'users' ? users : requests}
          openedTab={openedTab}
        />
      </Drawer>
    </div>
  )
}

export default Requests
