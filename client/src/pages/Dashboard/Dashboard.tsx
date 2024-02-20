import { ReactElement, useEffect, useState } from 'react'
import BoardList from '../../components/BoardComponents/List/BoardList'
import NavBar from '../../components/NavBar/NavBar';
import { Board } from '../../types/board';
import { useBoardsQuery } from '../../hooks/cards';

function Dashboard(): ReactElement {
  const [boardId, setBoardId] = useState<string>('');
  const [boards, setBoards] = useState<Board[] | null>([])

  const { data } = useBoardsQuery();

  useEffect(() => {
    if (data) {
      setBoards(data);
    }
  }, [data]);

  const filteredBoards = boardId ? boards?.filter((board: Board) => board._id === boardId) : boards;

  return (
    <div>
      <NavBar setBoardId={setBoardId} boardId={boardId} />
      <div className='boards__container'>
        <BoardList filteredBoards={filteredBoards} />
      </div>
    </div>
  )
}

export default Dashboard
