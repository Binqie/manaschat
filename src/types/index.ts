export interface IProps {
  children?: React.ReactNode;
}

export interface IInput {
    id: string,
    name: string,
    type: string,
    label?: string,
}

export interface ISelect {
  value: number,
  label: string
}

export interface ISelectCollection {
  name: string,
  selects: ISelect[],
}