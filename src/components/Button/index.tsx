import React, { FC } from 'react'

type ButtonProps = {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  isDisabled?: boolean
}

export const Button: FC<ButtonProps> = ({ label, onClick, isDisabled = false }) => (
  <button
    onClick={onClick}
    aria-label={'Add Item'}
    className={`xui-button-standard xui-button-medium ${isDisabled && `xui-button-is-disabled`}`}
    disabled={isDisabled}
  >
    {label}
  </button>
)
