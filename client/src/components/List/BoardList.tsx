import { ReactElement } from 'react'
import { useBoardsQuery } from '../../hooks/userBoardsQuery'
import BoardListItem from '../ListItem/BoardListItem';
import { Board } from '../../types/board';
import '../../assets/styles/board.scss'

type BoardListProps = {
  boardId?: string
}

function BoardList({ boardId }: BoardListProps): ReactElement {
  const { data } = useBoardsQuery();

  const filteredBoards = boardId ? data?.filter((board: Board) => board._id === boardId) : data;

  return (
    <div className='boards__container'>
      {filteredBoards?.map((el: Board) => (
        <BoardListItem key={el.name} board={el} />
      ))}
    </div>
  )
}

export default BoardList
