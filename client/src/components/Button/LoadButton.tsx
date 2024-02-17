import { ReactElement } from 'react'

type LoadButtonProps = {
  onClick: () => void
}

function LoadButton({ onClick }: LoadButtonProps): ReactElement {
  return (
    <button className='load__btn' onClick={onClick}>
      Load
    </button>
  )
}

export default LoadButton
