import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import $api from '../../api'
import { BASE_URL } from '../../constants/consts'
import { ISelectCollection } from '../../types'
import { useAppDispatch } from '../../hooks/hooks'

interface UserState {
  isAuthorized: Boolean
  user: Object
  faculties: ISelectCollection
  departments: ISelectCollection
}

const initialState: UserState = {
  isAuthorized: false,
  user: {},
  faculties: {
    name: 'faculties',
    selects: [],
  },
  departments: {
    name: 'departments',
    selects: [],
  },
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Object>) => {
      state.user = action.payload
    },
    setFaculties: (state, action) => {
      state.faculties.selects = action.payload
    },
    setDepartments: (state, action) => {
      state.departments.selects = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFaculties.fulfilled, (state, action) => {
      // Add user to the state array
      state.faculties.selects = action.payload
    }),
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      // Add user to the state array
      state.departments.selects = action.payload
    })
  },
})

export const fetchFaculties = createAsyncThunk('user/faculties', async () => {
  const response = await $api.get(`${BASE_URL}/Faculties/GetAllFaculties`)
  const data = response.data.map(
    (item: { value: number; label: string; id: number; title: string }) => {
      const newItem = {
        value: item.id,
        label: item.title,
      }
      return newItem
    }
  )
  return data
  // console.log('facs', response.data)
})

export const fetchDepartments = createAsyncThunk(
  'user/departments',
  async () => {
    const response = await $api.get(`${BASE_URL}/Faculties/GetAllDepartments`)
    const data = response.data.map((item: { id: number; title: string, facultyId: number }) => {
      const newItem = {
        value: item.id,
        label: item.title,
        facultyId: item.facultyId
      }
      return newItem
    })
    return data
    // console.log('deps', response.data)
  }
)

export const { setUser, setFaculties, setDepartments } = UserSlice.actions

export default UserSlice.reducer
