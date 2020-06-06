import React, { FC } from 'react'
import { HandleChange, HandleAddItem, FormState } from '../../types'
import { Button } from '..'

// Input Wrapper
type InputWrapperProps = {
  label: string
  id: string
  children: (id: string) => React.ReactNode
}

const InputWrapper: FC<InputWrapperProps> = ({ label, id, children }) => (
  <div className="xui-textinputwrapper" role={'presentation'}>
    <label htmlFor={id} className="xui-text-label xui-fieldlabel-layout">
      {label}
    </label>
    <div className="xui-textinput xui-textinput-medium">{children(id)}</div>
  </div>
)

//Input
const inputClassNames = 'xui-textinput--input'

type InvoiceInputProps = {
  formState: FormState
  handleChange: HandleChange
  handleAddItem: HandleAddItem
}

// Invoice Input
export const InvoiceInput: FC<InvoiceInputProps> = ({
  formState,
  handleChange,
  handleAddItem,
}) => (
  <div className="InvoiceInput">
    <div className="InvoiceInput--Details">
      <InputWrapper label={'Description'} id={'description'}>
        {(id: string) => (
          <input
            id={id}
            value={formState.description || ''}
            placeholder={'What have you sold?'}
            className={inputClassNames}
            onChange={(ev) => handleChange(ev)}
          />
        )}
      </InputWrapper>
      <InputWrapper label={'Quantity'} id={'quantity'}>
        {(id: string) => (
          <input
            id={id}
            value={formState.quantity || ''}
            placeholder={'Number'}
            type="number"
            className={inputClassNames}
            onChange={(ev) => handleChange(ev)}
          />
        )}
      </InputWrapper>
      <InputWrapper label={'Cost'} id={'cost'}>
        {(id: string) => (
          <input
            id={id}
            value={formState.cost || ''}
            placeholder={'Number'}
            type="number"
            className={inputClassNames}
            onChange={(ev) => handleChange(ev)}
          />
        )}
      </InputWrapper>
    </div>
    <div className="InvoiceInput--Controls">
      <Button label={'Add Item'} onClick={() => handleAddItem()} />
    </div>
  </div>
)
