import { ReactElement } from 'react'
import { BoardListItemProps } from './types';

import '../../../assets/styles/card.scss'
import BoardTitle from '../Title/BoardTitle';
import CardList from '../../CardComponents/List/CardList';
import DeleteBoard from '../Button/DeleteBoard';

function BoardListItem({ board }: BoardListItemProps): ReactElement {
  return(
    <div className='board__container'>
      <div className='board__navbar'>
        <BoardTitle board={board} />
        <DeleteBoard id={board._id} />
      </div>
      <div className="board__cards">
        <CardList board={board} />
      </div>
    </div>
  )
}

export default BoardListItem
