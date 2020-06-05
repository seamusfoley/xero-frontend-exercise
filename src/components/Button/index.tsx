import React, { FC } from 'react'
import classNames from 'classnames'

type ButtonProps = {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    aria-label={'Add Item'}
    className={classNames('xui-button-standard', 'xui-button-medium')}
  >
    {label}
  </button>
)
