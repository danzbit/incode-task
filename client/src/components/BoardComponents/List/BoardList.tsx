import { ReactElement } from 'react'
import { Board } from '../../../types/board';
import { BoardListProps } from './types';

import BoardListItem from '../ListItem/BoardListItem';
import '../../../assets/styles/board.scss'

function BoardList({ filteredBoards }: BoardListProps): ReactElement {
  return (
    <div className='boards__container'>
      {filteredBoards?.map((el: Board) => (
        <BoardListItem key={el.name} board={el} />
      ))}
    </div>
  )
}

export default BoardList
