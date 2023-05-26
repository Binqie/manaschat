export interface IProps {
  children?: React.ReactNode;
}

export interface IRoute {
  path: string;
  element: React.ReactNode;
  children?: IRoute[];
}

export interface IInput {
  id: string;
  name: string;
  type: string;
  label?: string;
}

export interface IFaculty {
  value: number;
  label: string;
}

export interface IDepartment {
  value: number;
  label: string;
  facultyId?: number;
}

export interface ISelect {
  value: number;
  label: string;
}

export interface ICode {
  code: string;
}

export interface ISelectCollection {
  name: string;
  selects: ISelect[];
}

export interface IUser {
  id: number;
  email: string;
  password?: string;
  fullname: string;
  facultyId: number;
  departmentId: number;
  classroom: number | null;
  course: number;
  yearOfAdmission: number;
  groupEntryYear?: number;
  type?: number;
  isActive?: boolean;
  isVerify?: boolean;
}

export interface IStoreUser {
  isAuthorized: boolean;
  user: object;
  faculties: ISelectCollection;
  departments: ISelectCollection;
}

export interface IComment {
  author?: null;
  authorId: number;
  createdAt?: string;
  id: number;
  post?: null;
  postId: number;
  text: string;
}

export interface ICommentCreate {
  postId: number;
  text: string;
}

export interface ICommentEdit {
  id: number;
  text: string;
}

export interface IPost {
  id: number;
  createdAt: string;
  title: string;
  body: string;
  image: string | undefined;
  type: number;
  electionPostDetailsList: [
    {
      id: number;
      postId: number;
      variant: string;
    }
  ];
  electionPostResultsList: [
    {
      id: number;
      authorId: number;
      electionPostDetailId: number;
    }
  ];
  suggestionPostResultsList: [
    {
      id: number;
      authorId: number;
      postId: number;
      isAgree: boolean;
    }
  ];
  authorId: number;
  authorFullname: string;
}

export interface IPostProps {
  post: IPost;
}

export interface IPostCreate {
  body: string;
  title: string;
  image: any;
  type: number;
}

export interface IElectionDetails {
  postId: number;
  variants: string[];
}

export enum PostTypesEnum {
  COMMENT,
  SUGGESTION,
  ELECTION,
}

export interface IInputProps {
  inputs: IInput[];
}

export interface IStore {
  user: IStoreUser;
  posts: IPost;
}

export interface IRequest {
  classroom: number;
  course: number;
  createdAt: string;
  email: string;
  id: number;
}
