import { ReactElement } from 'react'
import { CustomCardProps } from './types';

import CardContainer from '../Container/CardContainer'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { error } from '../../../helpers/toastHelper';
import { Card, CardState } from '../../../types/card';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateCard } from '../../../hooks/cards';

function CustomCard({
  el,
  item,
  dragEndHandler,
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
  titleRef,
  descRef,
  board,
  cards,
  setCards,
  setIsCreated,
  setNewCards
}: CustomCardProps): ReactElement {
  const client = useQueryClient();

  const { mutate: create } = useCreateCard(client)

  function handleAddCard(boardId: string): void {
    const title = titleRef.current?.value;
    const description = descRef.current?.value;

    if (title == "" || title == null && description == "" || description == null) {
      error("Please fill out the information")
    }
    else {
      const cardState = 'ToDo'

      const todoColumn = cards?.find(column => column.title === cardState);
      const lastPriority = todoColumn?.items.length !== 0 ? todoColumn?.items[todoColumn?.items.length - 1].priority : 1;
      const dashboardId = boardId;
      const newCard: Card =
      {
        title: title as string,
        description: description as string,
        columnType: cardState as CardState,
        priority: lastPriority as number + 1,
        createdAt: new Date(),
        dashboard: dashboardId as string
      }
      const updatedCards = cards.map(column => {
        if (column.title === cardState) {
          return {
            ...column,
            items: [...column.items, newCard]
          };
        }
        return column;
      });

      setNewCards([]);
      setCards(updatedCards)
      setIsCreated(false)
      create(newCard)
    }
  }
  
  return (
    <div key={item.title}>
      <CardContainer
        el={el}
        item={item}
        dragEndHandler={dragEndHandler}
        dragLeaveHandler={dragLeaveHandler}
        dragOverHandler={dragOverHandler}
        dragStartHandler={dragStartHandler}
      >
        <div className="card__item card__title">
          <p>{`Title: `}</p>
          <input type="text" placeholder='Enter title' ref={titleRef} />
        </div>
        <div className="card__item card_desc">
          <p>{`Description: `}</p>
          <input type="text" placeholder='Enter description' ref={descRef} />
        </div>
        <div className="card__icons" onClick={() => handleAddCard(board._id)}>
          <DoneAllRoundedIcon style={{ color: 'green' }} />
        </div>
      </CardContainer>
    </div>
  )
}

export default CustomCard
