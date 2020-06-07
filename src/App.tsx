import React, { useState, useEffect, useRef } from 'react'
import {
  HandleChange,
  HandleAddItem,
  FormState,
  ValidationState,
  LineItemState,
  HandleSubmit,
  Validity
} from './types'
import { InvoiceInput, Invoice, Button } from './components'
import { createTempKey, wait } from './utils'
import { createValidator } from './utils'
import { validateRequired } from './utils/validations'

const App = () => {
  const defaultFormState = {
    description: '',
    quantity: 0,
    cost: 0,
  }

  const createDefaultValidationState = () => (
    Object.entries(defaultFormState).reduce<ValidationState>((a, [key, _]) => ({ 
      ...a, 
      [key]: {
        validity: Validity.UNTOUCHED,
        messages: ['Required'],
      }
    }), {})
  )

  // State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formState, setFormState] = useState<FormState>({})
  const [lineItemState, setLineItemState] = useState<LineItemState>({})
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [validationState, setValidationState] = useState<ValidationState>(createDefaultValidationState())

  // Refs
  const validate = useRef(createValidator(
    [
      { test: validateRequired, invalidMessage: 'Field is Required' }
    ],
    setValidationState
  ))
  
  //Effects
  // useEffect(() => { console.log(formState) }, [formState])
  // useEffect(() => { console.log(lineItemState) }, [lineItemState])

  // Handlers
  const handleVaildation = (nextFormState: FormState): void => {
    const nextValidationState = {...validationState, ...validate.current(nextFormState)}
    setValidationState(nextValidationState)
    handleFormVaildation(nextValidationState)
  }

  const handleFormVaildation = (currentState?: ValidationState): void => {
    const vState = currentState || validationState

    setIsFormValid(
      Object.values(vState)
      .reduce<boolean>((a, { validity: v = 2}) => (
        v !== 1 ? false : a
      ), true)
    )
  }

  const handleChange: HandleChange = (event) => {
    const { id, value } = event.target
    const nextInputValue = { [id]: value }

    const nextFormState = { ...formState, ...nextInputValue }

    setFormState(nextFormState)
    handleVaildation(nextInputValue)
  }

  const handleAddItem: HandleAddItem = () => {
    // checkValidation
    const { id: stateId } = formState
    const id = stateId || createTempKey()
    // Merge with default state
    const defaultedForm = { ...defaultFormState, ...formState }
    const { cost, quantity } = defaultedForm
    const price = cost * quantity
    const addableForm = { ...defaultedForm, price }

    setLineItemState({ ...lineItemState, [id]: addableForm })
    setFormState({})
    setValidationState(createDefaultValidationState())
    setIsFormValid(false)
  }

  const handleSubmit: HandleSubmit = async () => {
    // checkValidation
    setIsSubmitting(true)

    await wait(2000)

    console.log('Submitted', lineItemState)
    setIsSubmitting(false)
    setLineItemState({})
    setFormState({})
    setValidationState(createDefaultValidationState())
  }

  // Render
  return (
    <div
      className={`
        xui-composition
        xui-composition-is-finite
        xui-composition-has-auto-space-around
        xui-composition-detailheader
      `}
    >
      <div className={'xui-panel'}>
        <section className={'xui-panel--section'}>
          <InvoiceInput
            formState={formState}
            validationState={validationState}
            handleChange={handleChange}
            handleAddItem={handleAddItem}
            handleFormVaildation={handleFormVaildation}
            isFormValid={isFormValid}
          />
          <Invoice lineItems={lineItemState} />
          <div className={'InvoiceGrid'}>
            <div className={'InvoiceFooter'}>
              <Button
                isDisabled={Object.keys(lineItemState).length === 0}
                label={isSubmitting ? 'Submitting' : 'Submit Invoice'}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
