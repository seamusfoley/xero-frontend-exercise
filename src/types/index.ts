export type KeyTypes = string | number | symbol

export type AnyFunction = (...args: any[]) => any

export enum Validity {
  INVALID,
  VALID,
  UNTOUCHED,
}

export type ValidationState = {
  [key: string]: {
    validity: Validity
    messages: Message[]
  }
}

export type HandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => void

export type HandleAddItem = () => void

export type HandleSubmit = () => Promise<void>

export type FormState = {
  id?: string
  description?: string
  quantity?: number
  cost?: number
  price?: number
}

export type LineItemState = { [id: string]: Required<Omit<FormState, 'id'>> }

// Validation Types

type Fields = string[]

export type ValidationTest = (fieldValue: any) => boolean

export type Message = string 

export type Validation = {
  test: ValidationTest,
  fields?: Fields,
  invalidMessage?: Message
  validMessage?: Message
}

// From https://stackoverflow.com/questions/61132262/typescript-deep-partial
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};