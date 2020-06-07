import React from 'react'
import App from '../src/App'
import {
  render,
  fireEvent,
  waitForElement,
  screen,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Renders', () => {
  test('renders without crashing', () => {
    render(<App />)
  })
})

describe('Action', () => {
  test('Submit Button', async () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('SubmitButton'))
    await waitForElement(() => screen.getByTestId('SubmitButton'))
    expect(screen.getByTestId('SubmitButton')).toHaveTextContent(
      'Submit Invoice',
    )
  })

  test('Button is disabled', async () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('AddItem'))
    expect(screen.getByTestId('AddItem')).toHaveProperty('disabled')
  })

  test('Content', async () => {
    render(<App />)

    fireEvent.click(screen.getByTestId('AddItem'))
    expect(screen.getByTestId('AddItem')).toHaveProperty('disabled')
  })
})
