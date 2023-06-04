import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { $api } from "shared/api";
import { BASE_URL } from "shared/config/consts";
import { ISelectCollection, IUser } from "shared/model/Types";

interface UserState {
  isAuthorized: Boolean;
  user: IUser;
  faculties: ISelectCollection;
  departments: ISelectCollection;
}

const initialState: UserState = {
  isAuthorized: true,
  user: {
    id: -1,
    classroom: 0,
    course: 0,
    departmentId: 0,
    email: "0000.00000@manas.edu.kg",
    facultyId: 1,
    fullname: "Name",
    groupEntryYear: 2000,
    isActive: false,
    isVerify: false,
    type: 0,
    yearOfAdmission: 2000,
  },
  faculties: {
    name: "faculties",
    selects: [],
  },
  departments: {
    name: "departments",
    selects: [],
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setAuthorized: (state, action: PayloadAction<Boolean>) => {
      state.isAuthorized = action.payload;
    },
    setFaculties: (state, action) => {
      state.faculties.selects = action.payload;
    },
    setDepartments: (state, action) => {
      state.departments.selects = action.payload;
    },
    logout: (state) => {
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFaculties.fulfilled, (state, action) => {
      state.faculties.selects = action.payload;
    }),
      builder.addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments.selects = action.payload;
      });
  },
});

export const fetchFaculties = createAsyncThunk("user/faculties", async () => {
  const response = await $api.get(`${BASE_URL}/Faculties/GetAllFaculties`);
  const data = response.data.map(
    (item: { value: number; label: string; id: number; title: string }) => {
      const newItem = {
        value: item.id,
        label: item.title,
      };
      return newItem;
    }
  );
  return data;
});

export const fetchDepartments = createAsyncThunk(
  "user/departments",
  async () => {
    const response = await $api.get(`${BASE_URL}/Faculties/GetAllDepartments`);
    const data = response.data.map(
      (item: { id: number; title: string; facultyId: number }) => {
        const newItem = {
          value: item.id,
          label: item.title,
          facultyId: item.facultyId,
        };
        return newItem;
      }
    );
    return data;
  }
);

export const { setUser, setAuthorized, setFaculties, setDepartments, logout } =
  UserSlice.actions;

export default UserSlice.reducer;
