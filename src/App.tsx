import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { HandleChange, HandleAddItem, FormState, ValidationState, LineItemState } from './types'
import { InvoiceInput } from './components'
import { Invoice } from './components'
import { createTempKey } from './utils'


const defaultFormState = {
  description: '',
  quantity: 0,
  cost: 0,
  price: 0
}

const App = () => {
  const defaultFormState = {
    description: '',
    quantity: 0,
    cost: 0,
    price: 0
  }
  // State
  const [formState, setFormState] = useState<FormState>({})
  const [validationState, setValidationState] = useState<ValidationState<Required<keyof FormState>>>()
  const [lineItemState, setLineItemState] = useState<LineItemState>()

  //Effects
  useEffect(() => { console.log(formState) }, [formState])

  // Handlers
  const handleVaildation = (formState: {[key: string]: unknown}, validtions: any[]) => {
    // Do something to validate
    // setValidationState({})
  }

  const handleChange: HandleChange = (event) => {
    const { id, value }  = event.target
    const nextInputValue = { [id]: value }

    const nextFormState = {...formState, ...nextInputValue}

    setFormState(nextFormState)
    handleVaildation(nextFormState, [])
  }

  const handleAddItem: HandleAddItem = () => {
    // checkValidation
    const { id: stateId} = formState
    const id = stateId || createTempKey()
    // Merge with default state
    const defaultedForm = { ...defaultFormState, ...formState }
    const { price, quantity } = defaultedForm
    const cost = price * quantity
    const addableForm = {...defaultFormState, cost}
    
    setLineItemState({ [id]: addableForm})
  }


  // Render
  return (
    <div className={classNames('xui-composition', 'xui-composition-is-finite', 'xui-composition-has-auto-space-around', 'xui-composition-detailheader')} >
      <div className={'xui-panel'} >
        <section className={'xui-panel--section'}>
          <InvoiceInput handleChange={handleChange} handleAddItem={handleAddItem}/>
          <Invoice lineItems={lineItemState} />
        </section>
      </div>
    </div>
  )
}

export default App;
