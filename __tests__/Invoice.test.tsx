import React from 'react'
import { Invoice } from '../src/components'
import { render } from '@testing-library/react'

const lineItemState = {
  1:{
    description: 'Hello',
    quantity: 2, 
    cost: 2,
    price: 4,
  }
}

describe('Renders', () => {
  test('renders without crashing', () => {
    render(<Invoice />)
  })

  test('Renders with Line Items', () => {
    render(<Invoice lineItems={lineItemState}/>)
  })
})
