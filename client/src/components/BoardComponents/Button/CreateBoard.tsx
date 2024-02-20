import { ReactElement } from 'react'
import { CreateBoardProps } from './types'

function CreateBoard({handleAddBoardClick}: CreateBoardProps): ReactElement {
  return (
    <button onClick={handleAddBoardClick}>Add Board</button>
  )
}

export default CreateBoard
