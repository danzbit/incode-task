import  { ReactElement, useState } from 'react'
import { CardItemProps } from './types';

import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import CardContainer from '../Container/CardContainer'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { useDeleteCard, useUpdateCard } from '../../../hooks/cards';
import { useQueryClient } from '@tanstack/react-query';
import { Card, UpdateCard } from '../../../types/card';
import { error } from '../../../helpers/toastHelper';

function CardItem({
  el,
  item,
  dragEndHandler,
  dragLeaveHandler,
  dragOverHandler,
  dragStartHandler,
  updatedTitleRef,
  updatedDescRef,
}: CardItemProps): ReactElement {
  const client = useQueryClient()

  const { mutate: updatedCard } = useUpdateCard(client)
  const { mutate: deletedCard } = useDeleteCard(client)

  const [editMode, setEditMode] = useState<string | null>(null);
  
  const editCard = (item: Card): void => {
    setEditMode((prevMode) => (prevMode === item.title ? prevMode : item.title));
  };

  function handleUpdateCard(prevTitle: string): void {
    const title = updatedTitleRef.current?.value as string
    const description = updatedDescRef.current?.value as string

    if (title == "" || title == null && description == "" || description == null) {
      error("Please fill out the information")
    }
    else {
      const editedCard: UpdateCard = {
        prevTitle,
        title,
        description
      }

      updatedCard(editedCard)
    }
  }

  function handleDeleteClick(id?: string) {
    deletedCard(id)
  }

  return (
    <div>
      <CardContainer
        el={el}
        item={item}
        dragEndHandler={dragEndHandler}
        dragLeaveHandler={dragLeaveHandler}
        dragOverHandler={dragOverHandler}
        dragStartHandler={dragStartHandler}
      >
        <div className="card__item card__title">
          {editMode == item.title ?
            (
              <>
                <p>{`Title: `}</p>
                <input type="text" placeholder='Enter title' ref={updatedTitleRef} />
              </>
            )
            : (
              <p>{`Title: ${item.title}`}</p>
            )
          }
        </div>
        <div className="card__item card_desc">
          {editMode == item.title ?
            (
              <>
                <p>{`Description: `}</p>
                <input type="text" placeholder='Enter description' ref={updatedDescRef} />
              </>
            )
            : (
              <p>{`Description: ${item.description}`}</p>
            )
          }
        </div>
        <div className="card__icons">
          <div onClick={() => editCard(item)}>
            {editMode == item.title ?
              <div onClick={() => handleUpdateCard(item.title)}>
                <DoneAllRoundedIcon style={{ color: 'green' }} />
              </div>
              : <BorderColorRoundedIcon />
            }
          </div>
          {editMode !== item.title && <div onClick={() => handleDeleteClick(item._id)}>
            <DeleteRoundedIcon />
          </div>}
        </div>
      </CardContainer>
    </div>
  )
}

export default CardItem
