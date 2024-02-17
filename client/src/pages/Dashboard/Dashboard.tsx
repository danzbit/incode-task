import { ReactElement, useState } from 'react'
import LoadInput from '../../components/Input/LoadInput'
import BoardList from '../../components/List/BoardList'
import '../../assets/styles/search.scss'

function Dashboard(): ReactElement {
  const [boardId, setBoardId] = useState<string>('');

  return (
    <div>
      <div className='search__container'>
        <LoadInput value={boardId} onChange={(e) => setBoardId(e.target.value)}/>
      </div>
      <div className='boards__container'>
        <BoardList boardId={boardId}/>
      </div>
    </div>
  )
}

export default Dashboard
