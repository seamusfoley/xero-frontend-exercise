import { AnyFunction } from '../types' 

// Map Entries 
export const mapEntries = <T extends string, U = any>(
  object: {[key in T]: any} | {}, 
  fn: (key: T, value: any) => {[key : string]: U}
): {[key in T]: U} | {} => (
  (Object.entries(object) as [T, unknown][]).reduce((a, [key, value]) => (
    {...a, ...fn(key, value)}
  ), object)
)

// Pipe
export type Pipe = (...fns: AnyFunction[]) => <T>(state: T) => any

export const pipe: Pipe = (...fns) => (state) => (
  Array.from(fns).reduce(
    (v, fn) => fn(v), state
  )
)

// Create Temp Key
export const createTempKey = () => `${Math.floor(Math.random() * 1000)}_${Date.now()}`