import React, { useState, useEffect } from 'react'
import {
  HandleChange,
  HandleAddItem,
  FormState,
  ValidationState,
  LineItemState,
} from './types'
import { InvoiceInput, Invoice, Button } from './components'
import { createTempKey, wait } from './utils'

const App = () => {
  const defaultFormState = {
    description: '',
    quantity: 0,
    cost: 0,
    price: 0,
  }

  // State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formState, setFormState] = useState<FormState>({})
  // const [validationState, setValidationState] = useState<ValidationState<Required<keyof FormState>>>()
  const [lineItemState, setLineItemState] = useState<LineItemState>({})

  //Effects
  // useEffect(() => { console.log(formState) }, [formState])
  // useEffect(() => { console.log(lineItemState) }, [lineItemState])

  // Handlers
  const handleVaildation = (
    formState: { [key: string]: unknown },
    validtions: any[],
  ) => {
    // Do something to validate
    // setValidationState({})
  }

  const handleChange: HandleChange = (event) => {
    const { id, value } = event.target
    const nextInputValue = { [id]: value }

    const nextFormState = { ...formState, ...nextInputValue }

    setFormState(nextFormState)
    handleVaildation(nextFormState, [])
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
  }

  const handleSubmit = async () => {
    // checkValidation
    setIsSubmitting(true)
    await wait(2000)
    console.log('Submitted', lineItemState)
    setIsSubmitting(false)
    setLineItemState({})
    setFormState({})
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
            handleChange={handleChange}
            handleAddItem={handleAddItem}
          />
          <Invoice lineItems={lineItemState} />
          <div className={'InvoiceGrid'}>
            <div className={'InvoiceFooter'}>
              <Button
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
