import React, { FC } from 'react'
import { HandleChange, HandleAddItem } from '../../types'
import classNames from 'classnames'


// Input Wrapper
type InputWrapperProps = {
  label: string
  id: string
  children: (id: string) => React.ReactNode
}

const InputWrapper: FC<InputWrapperProps> = ({ label, id, children }) => (
  <div className="xui-textinputwrapper" role={"presentation"}>
    <label htmlFor={id} className="xui-text-label xui-fieldlabel-layout">{ label }</label>
      <div className="xui-textinput xui-textinput-medium">
         { children(id) }
      </div>
  </div>
)

//Input
const inputClassNames = classNames('xui-textinput--input')

// Button
type ButtonProps = {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: FC<ButtonProps> = ({label, onClick}) => (
  <button
    onClick={onClick}
    aria-label={'Add Item'} 
    className={classNames('xui-button-standard', 'xui-button-medium')}
  >
    {label}
  </button>
)

type InvoiceInputProps = ({
  handleChange: HandleChange
  handleAddItem: HandleAddItem
})

// Invoice Input
export const InvoiceInput: FC<InvoiceInputProps> = ({ handleChange, handleAddItem }) => (
  <div className="InvoiceInput">
    <div className="InvoiceInput--Details">
      <InputWrapper label={'Description'} id={'description'}>
        {(id: string) => (
          <input 
            id={id} 
            placeholder={'What have you sold?'} 
            className={inputClassNames} 
            onChange={(ev) => handleChange(ev)}
          />
        )}
      </InputWrapper>
      <InputWrapper label={'Quantity'} id={'quantity'}>
        {(id: string) => (
          <input 
          step={1}
          id={id} 
          placeholder={'Number'} 
          type="number" 
          className={inputClassNames} 
          onChange={(ev) => handleChange(ev)}/>
        )}
      </InputWrapper>
      <InputWrapper label={'Price'} id={'price'}>
        {(id: string) => (
          <input
            id={id} 
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
