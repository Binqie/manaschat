import { IInput } from 'shared/model/Types'

export enum PostTypesEnum {
  COMMENT,
  SUGGESTION,
  ELECTION
}

export interface IInputProps {
  inputs: IInput[]
}
