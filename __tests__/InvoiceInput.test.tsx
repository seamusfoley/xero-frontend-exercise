import React from 'react'
import { InvoiceInput } from '../src/components'
import { Validity, ValidationState } from '../src/types'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const defaultFormState = {
  description: 'testDescription',
  quantity: 1,
  cost: 2,
}

const createDefaultValidationState = () =>
  Object.entries(defaultFormState).reduce<ValidationState>(
    (a, [key, _]) => ({
      ...a,
      [key]: {
        validity: Validity.VALID,
        messages: ['Required'],
      },
    }),
    {},
  )

describe('Renders', () => {
  test('renders without crashing', () => {
    render(<InvoiceInput 
      validationState={createDefaultValidationState()} 
      handleChange={() => {}} 
      handleAddItem={() => {}} 
      handleFormVaildation={() => {}}
      isFormValid={true}
      formState={defaultFormState}
    />);
  })
})


describe('Action', () => {
  test('Submit Button', async () => {
    render(<InvoiceInput 
      validationState={createDefaultValidationState()} 
      handleChange={() => {}} 
      handleAddItem={() => {}} 
      handleFormVaildation={() => {}}
      isFormValid={true}
      formState={defaultFormState}
    />)

    expect(screen.getByPlaceholderText("What have you sold?")).toHaveValue('testDescription')
  })
})
