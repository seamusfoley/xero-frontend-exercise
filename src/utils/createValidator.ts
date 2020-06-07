import { Validity, AnyFunction, Validation, ValidationState } from '../types'
import { pipe } from '../utils'

// TYPES

type Validator = (validationState: ValidationState) => ValidationState

// FUNCTIONS

export const createValidator = (validations: Validation[], cb: AnyFunction) => {
  //Closes over the current form state for each validator
  const createValidationApplier = <T extends { [key: string]: unknown }>(
    formState: T,
    validation: Validation,
  ): Validator => (validationState): ValidationState => {
    const { test, fields, invalidMessage, validMessage } = validation

    // Run validations on form state
    const thisValidation = Object.entries(formState).reduce<{
      [key: string]: { validity: Validity; message?: string }
    }>((a, [key, value]) => {
      if (!fields || fields.includes(key)) {
        return {
          ...a,
          [key]: {
            validity: test(value) ? Validity.VALID : Validity.INVALID,
            message: test(value) ? validMessage : invalidMessage,
          },
        }
      }

      return a
    }, {})

    // Merge validation state
    const mergedValidationState = Object.entries(validationState).reduce<
      ValidationState
    >((a, [key, value]) => {
      const thisValidationField = thisValidation[key]

      return {
        ...a,
        [key]: {
          validity: Math.min(thisValidationField.validity, value.validity),
          messages: thisValidationField.message
            ? [...value.messages, thisValidationField.message]
            : value.messages,
        },
      }
    }, {})

    return mergedValidationState
  }

  // Create and pipe the validations
  return <T extends { [key: string]: any }>(formState: T): ValidationState => {
    const v = validations.map((validation) =>
      createValidationApplier(formState, validation),
    )

    const initialValidationState = Object.entries(formState).reduce<
      ValidationState
    >(
      (a, [key, _]) => ({
        ...a,
        [key]: {
          validity: Validity.VALID,
          messages: [],
        },
      }),
      {},
    )

    return pipe(...v)(initialValidationState)
  }
}
