import { ReactElement } from 'react'
import { BoardTitleProps } from './types'

function BoardTitle({board}: BoardTitleProps): ReactElement {
  return (
    <div className='board__title'>
      <p>{`Id: ${board._id}`}</p>
      <p>{`Name: ${board.name}`}</p>
    </div>
  )
}

export default BoardTitle
