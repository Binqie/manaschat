import { IInput } from "shared/model/Types"
import { FieldValues } from 'react-hook-form/dist/types'


export interface IInputProps {
  type: 'election' | 'suggestion' | 'comment'
  inputs: IInput[]
}

export const onSubmit = (data: FieldValues): void => {
    console.log('data', data)
  }