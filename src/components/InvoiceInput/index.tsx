import React, { FC } from 'react'
import { HandleChange, HandleAddItem, FormState, ValidationState, Validity } from '../../types'
import { Button } from '..'

// Input Wrapper
type InputWrapperProps = {
  label: string
  id: string
  message?: string
  validity?: Validity
  children: (id: string) => React.ReactNode
}

const InputWrapper: FC<InputWrapperProps> = ({ label, id, validity = Validity.VALID , message = '', children }) => (
  <div className="xui-textinputwrapper InvoiceInput-Flex" role={'presentation'}>
    <label htmlFor={id} className="xui-text-label xui-fieldlabel-layout">
      {label}
    </label>
    <div className="xui-textinput xui-textinput-medium">{children(id)}</div>
    <label className={`xui-text-secondary ${ validity === Validity.INVALID && `StatusColor--Warning`}`} style={{position: 'absolute'}}>
      {message}
    </label>
  </div>

)

//Input
const inputClassNames = 'xui-textinput--input'

type InvoiceInputProps = {
  formState: FormState
  validationState: ValidationState
  isFormValid: boolean
  handleChange: HandleChange
  handleAddItem: HandleAddItem
  handleFormVaildation: () => void,
}

// Invoice Input
export const InvoiceInput: FC<InvoiceInputProps> = ({
  formState,
  validationState,
  isFormValid,
  handleChange,
  handleAddItem,
  handleFormVaildation,
}) => (
  <div className="InvoiceInput">
    <div className="InvoiceInput--Details">
      <div className="InvoiceInput--Description">
        <InputWrapper 
          label={'Description'}
          id={'description'}
          validity={validationState?.description?.validity}
          message={validationState?.description?.messages[0]}
        >
          {(id: string) => (
            <input
              id={id}
              value={formState.description || ''}
              placeholder={'What have you sold?'}
              className={inputClassNames}
              onChange={(ev) => handleChange(ev)}
              onBlur={(_) => handleFormVaildation()}
            />
          )}
        </InputWrapper>
      </div>
      <div className="InvoiceInput--QuantityCosts">
        <InputWrapper 
          label={'Quantity'} 
          id={'quantity'}
          validity={validationState?.quantity?.validity}
          message={validationState.quantity.messages[0]}
        >
          {(id: string) => (
            <input
              id={id}
              inputMode="decimal"
              value={formState.quantity || ''}
              placeholder={'Number'}
              type="number"
              className={inputClassNames}
              onChange={(ev) => handleChange(ev)}
              onBlur={(_) => handleFormVaildation()}
            />
          )}
        </InputWrapper>
        <InputWrapper 
          label={'Cost'} 
          id={'cost'}
          validity={validationState?.cost?.validity}
          message={validationState.cost.messages[0]}
        >
          {(id: string) => (
            <input
              id={id}
              inputMode="decimal"
              value={formState.cost || ''}
              placeholder={'Number'}
              type="number"
              className={inputClassNames}
              onChange={(ev) => handleChange(ev)}
              onBlur={(_) => handleFormVaildation()}
            />
          )}
        </InputWrapper>
      </div>
      <div className="InvoiceInput--Controls">
        <Button label={'Add Item'} onClick={() => handleAddItem()} isDisabled={!isFormValid} />
      </div>
    </div> 
  </div>
)
