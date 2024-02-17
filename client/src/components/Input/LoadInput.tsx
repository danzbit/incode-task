import { ReactElement } from 'react'

type LoadInputProps = {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

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
