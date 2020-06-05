import React, { FC } from 'react'

type ButtonProps = {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    aria-label={'Add Item'}
    className={'xui-button-standard xui-button-medium'}
  >
    {label}
  </button>
)
