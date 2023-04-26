export interface IProps {
  children?: React.ReactNode
}

export interface IRoute {
  path: string
  element: React.ReactNode
}

export interface IInput {
  id: string
  name: string
  type: string
  label?: string
}

export interface ISelect {
  value: number
  label: string
}

export interface ISelectCollection {
  name: string
  selects: ISelect[]
}

export interface IUser {
  email: string
  password: string
  fullname: string
  facultyId: number
  departmentId: number
  classroom: number | null
  course: number
  yearOfAdmission: number
}