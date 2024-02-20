import { ReactElement } from 'react'
import { LoadInputProps } from './types'

function LoadInput({ value, onChange }: LoadInputProps): ReactElement {
  return (
    <input type='text'
      placeholder='Enter board ID here'
      className='load__input'
      value={value}
      onChange={onChange}
    />
  )
}

export default LoadInput
