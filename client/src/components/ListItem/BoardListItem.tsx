import { ReactElement, useEffect, useRef, useState } from 'react'
import { Card, CardState, Cards, UpdateCard } from '../../types/card';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import '../../assets/styles/card.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCard, updateCards, updateCard, deleteCard } from '../../services/cards';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { useCardsByBoardIdQuery } from '../../hooks/useCardsByBoardId';

type BoardListItemProps = {
  board: {
    _id: string;
    name: string;
  }
}

function BoardListItem({ board }: BoardListItemProps): ReactElement {
  const { data } = useCardsByBoardIdQuery(board._id)

  const client = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['boardCards', 'boards']})
    }
  })

  const { mutate: updatedCards } = useMutation({
    mutationFn: updateCards,
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['boardCards', 'boards']})
    }
  })

  const { mutate: updatedCard } = useMutation({
    mutationFn: updateCard,
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['boardCards']})
    }
  })

  const { mutate: deletedCard } = useMutation({
    mutationFn: deleteCard,
     onSuccess: () => {
      client.invalidateQueries({queryKey: ['boardCards']})
    }
  })

  const titleRef = useRef<HTMLInputElement | null>(null)
  const descRef = useRef<HTMLInputElement | null>(null)
  const updatedTitleRef = useRef<HTMLInputElement | null>(null)
  const updatedDescRef = useRef<HTMLInputElement | null>(null)

  const [editMode, setEditMode] = useState<string | null>(null);
  const [cards, setCards] = useState<Cards[]>([])
  const [newCards, setNewCards] = useState<Card[]>();
  const [currentCard, setCurrentCard] = useState<Cards | null>(null)
  const [currentItem, setCurrentItem] = useState<Card | null>(null)
  const [isCreated, setIsCreated] = useState<boolean>(false)

  useEffect(() => data && setCards(data), [data])

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    const targetElement = e.target as HTMLDivElement;

    if (targetElement.className === 'card__container item') {
      targetElement.style.boxShadow = '0 6px 7px gray'
    }
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>): void {
    const targetElement = e.target as HTMLDivElement;

    targetElement.style.boxShadow = 'none'
  }

  function dragStartHandler(card: Cards, item: Card): void {
    setCurrentCard(card)
    setCurrentItem(item)
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
    const targetElement = e.target as HTMLDivElement;

    targetElement.style.boxShadow = 'none'
  }

  function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: Cards) {
    e.preventDefault()
    board.items.push(currentItem as Card)
    const currentIndex = currentCard?.items.indexOf(currentItem as Card)
    currentCard?.items.splice(currentIndex as number, 1)
    setCards(cards?.map((b) => {
      if (b.title == board.title) {
        updatedCards(board)
        return board;
      }
      if (b.title == currentCard?.title) {
        updatedCards(currentCard)
        return currentCard;
      }
      return b;
    }))
    const targetElement = e.target as HTMLDivElement;

    targetElement.style.boxShadow = 'none'
  }

  function addCard() {
    const cardState = 'ToDo';
    const newCard: Card = 
    {
      title: "Default",
      description: "Default",
      columnType: cardState as CardState,
      priority: 1 + 1,
      createdAt: new Date(),
      dashboard: "lastItem.dashboard"
    }

    setIsCreated(true)
    setNewCards([newCard]);
  }

  function handleAddCard() {
    const title = titleRef.current?.value;
    const description = descRef.current?.value;

    const cardState = 'ToDo'

    const todoColumn = cards?.find(column => column.title === cardState);
    const lastPriority = todoColumn?.items[todoColumn?.items.length - 1].priority;
    const dashboardId = todoColumn?.items[todoColumn?.items.length - 1].dashboard;
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

 const editCard = (item: Card) => {
    setEditMode(item.title === editMode ? null : item.title);
  };

  function handleUpdateCard(prevTitle: string) {
    const title = updatedTitleRef.current?.value as string
    const description = updatedDescRef.current?.value as string

    const editedCard: UpdateCard = {
      prevTitle,
      title,
      description
    } 

    updatedCard(editedCard)
  }

  function handleDeleteClick(id?: string) {
    deletedCard(id)
  }

  return (
    <div className='board__container'>
      <div className='board__title'>
        <p>{`Name: ${board.name}`}</p>
      </div>
      <div className="board__cards">
        {cards?.map((el: Cards) => (
          <div key={el.title} className="board__cards__item"
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, el)}
          >
            <div className="board__cards__item__title">
              <p>{el.title}</p>
            </div>
            <div className="board__cards__item__container">
              {el?.items?.map((item: Card) => (
                <div key={item.title}>
                  <div
                    onDragOver={(e) => dragOverHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragStart={() => dragStartHandler(el, item)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    className={`card__container item`}
                    draggable={true}>
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
                          : <BorderColorRoundedIcon />}
                      </div>
                      {editMode !== item.title && <div onClick={() => handleDeleteClick(item._id)}>
                        <DeleteRoundedIcon />
                      </div>}
                    </div>
                  </div>
                </div>
              ))}
              {el.title == 'ToDo' && newCards?.map(item => (
                <div key={item.title}>
                  <div
                    onDragOver={(e) => dragOverHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragStart={() => dragStartHandler(el, item)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    className={`card__container item`}
                    draggable={true}>
                    <div className="card__item card__title">
                      <p>{`Title: `}</p>
                      <input type="text" placeholder='Enter title' ref={titleRef}/>
                    </div>
                    <div className="card__item card_desc">
                      <p>{`Description: `}</p>
                      <input type="text" placeholder='Enter description' ref={descRef} />
                    </div>
                    <div className="card__icons" onClick={handleAddCard}>
                      <DoneAllRoundedIcon style={{color: 'green'}}/>
                    </div>
                  </div>
                </div>
              ))}
              {!isCreated && el.title == 'ToDo' && (
                <div className='card__container card__container-last' onClick={addCard}>
                  <p>+</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoardListItem
