import { ReactElement } from 'react'
import { BoardListItemProps } from './types';

import '../../../assets/styles/card.scss'
import BoardTitle from '../Title/BoardTitle';
import CardList from '../../CardComponents/List/CardList';

function BoardListItem({ board }: BoardListItemProps): ReactElement {
  return(
    <div className='board__container'>
      <BoardTitle board={board}/>
      <div className="board__cards">
        <CardList board={board} />
      </div>
    </div>
  )
}

export default BoardListItem
