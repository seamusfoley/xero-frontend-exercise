export type KeyTypes = string | number | symbol

export type AnyFunction = (...args: any[]) => any

export enum Valid {
  UNTOUCHED,
  INVALID,
  VALID,
}

export type ValidationState<T extends string> = {
  [key in T]: {
    valid: Valid
    message: string
  }
}

export type HandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => void

export type HandleAddItem = () => void

export type FormState = {
  id?: string
  description?: string
  quantity?: number
  cost?: number
  price?: number
}

export type LineItemState = { [id: string]: Required<Omit<FormState, 'id'>> }
