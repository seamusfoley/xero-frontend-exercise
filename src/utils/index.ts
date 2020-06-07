import { AnyFunction } from '../types'
import { createValidator } from './createValidator'

// Pipe
export type Pipe = (...fns: AnyFunction[]) => <T>(state: T) => any

export const pipe: Pipe = (...fns) => (state) =>
  Array.from(fns).reduce((v, fn) => fn(v), state)

// Create Temp Key
export const createTempKey = () =>
  `temp_${Date.now().toString().slice(-6)}_${Math.round(
    Math.random() * 10000,
  )}`


// Wait
export const wait = (time = 1000) =>
  new Promise((resolve, _) => {
    setTimeout(() => resolve(), time)
  })

export {
  createValidator
}
