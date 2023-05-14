import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { $api } from 'shared/api'
import { BASE_URL } from 'shared/config/consts'
import { ISelectCollection } from 'shared/model/Types'

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
    setAuthorized: (state, action: PayloadAction<Boolean>) => {
      state.isAuthorized = action.payload
    },
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
    builder.addCase(fetchFaculties.fulfilled, (state, action) => {
      state.faculties.selects = action.payload
    }),
      builder.addCase(fetchDepartments.fulfilled, (state, action) => {
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
})

export const fetchDepartments = createAsyncThunk(
  'user/departments',
  async () => {
    const response = await $api.get(`${BASE_URL}/Faculties/GetAllDepartments`)
    const data = response.data.map(
      (item: { id: number; title: string; facultyId: number }) => {
        const newItem = {
          value: item.id,
          label: item.title,
          facultyId: item.facultyId,
        }
        return newItem
      }
    )
    return data
  }
)

export const { setAuthorized, setUser, setFaculties, setDepartments } =
  UserSlice.actions

export default UserSlice.reducer
