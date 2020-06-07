import { ValidationTest } from '../../types'

export const validateEmail: ValidationTest = (email: string) => {
  // regex from http://regexlib.com/Search.aspx?k=email
  if (
    email.match(
      /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    )
  ) {
    return true
  }
  return false
}

export const validateRequired: ValidationTest = (fieldValue: any) => {
  if (fieldValue === undefined || null) return false
  if (fieldValue.toString && fieldValue.toString().length <= 0) return false
  return true
}
