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

export interface IFaculty {
  value: number
  label: string
}

export interface IDepartment {
  value: number
  label: string
  facultyId?: number
}

export interface ISelect {
  value: number
  label: string
}

export interface ICode {
  code: string
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

export interface IStoreUser {
  isAuthorized: boolean
  user: object
  faculties: ISelectCollection
  departments: ISelectCollection
}

export interface IPost {
  id: number
  createdAt: string
  title: string
  body: string
  image: string | undefined
  type: number
  electionPostDetailsList: [
    {
      id: number
      postId: number
      variant: string
    }
  ]
  electionPostResultsList: [
    {
      id: number
      authorId: number
      electionPostDetailId: number
    }
  ]
  suggestionPostResultsList: [
    {
      id: number
      authorId: number
      postId: number
      isAgree: boolean
    }
  ]
  authorId: number
  authorFullname: string
}

export interface IPostProps {
  post: IPost
}

export enum PostTypesEnum {
  COMMENT,
  SUGGESTION,
  ELECTION,
}

export interface IInputProps {
  inputs: IInput[]
}

export interface IStore {
  user: IStoreUser
  posts: IPost
}
