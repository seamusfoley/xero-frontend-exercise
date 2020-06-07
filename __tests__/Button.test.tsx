import React from 'react'
import { Button } from '../src/components'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Button', () => {
  test('renders without crashing', () => {
    render(<Button label={'Hello'} onClick={() => {}}/>)
  })
})
