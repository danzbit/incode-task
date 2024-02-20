import { useQueryClient } from '@tanstack/react-query';
import { ReactElement, useEffect, useRef, useState } from 'react'
import { Card, Cards, } from '../../../types/card';
import CardItem from '../Item/CardItem';
import CustomCard from '../Custom/CustomCard';
import CardTitle from '../Title/CardTitle';
import AddCardItem from '../Item/AddCardItem';
import { useCardsByBoardIdQuery, useUpdateCards } from '../../../hooks/cards';
import { CardListProps } from './types';

function CardList({ board }: CardListProps): ReactElement {
  const client = useQueryClient();

  const { data } = useCardsByBoardIdQuery(board._id)
  
  const [cards, setCards] = useState<Cards[]>([])
  
  useEffect(() => {
    if (data) {
      setCards(data)
    }
  }, [data])

  const { mutate: updatedCards } = useUpdateCards(client)

  const titleRef = useRef<HTMLInputElement | null>(null)
  const descRef = useRef<HTMLInputElement | null>(null)
  const updatedTitleRef = useRef<HTMLInputElement | null>(null)
  const updatedDescRef = useRef<HTMLInputElement | null>(null)

  const [newCards, setNewCards] = useState<Card[] | undefined>();
  const [currentCard, setCurrentCard] = useState<Cards | null>(null)
  const [currentItem, setCurrentItem] = useState<Card | null>(null)
  const [isCreated, setIsCreated] = useState<boolean>(false)

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    const targetElement = e.target as HTMLDivElement;

    if (targetElement.classList.contains('card__container') && targetElement.classList.contains('item')) {
      const isDropAboveTargetMiddle = e.clientY < targetElement.getBoundingClientRect().top + targetElement.offsetHeight / 2;
      targetElement.style.boxShadow = isDropAboveTargetMiddle ? '0 -6px 7px gray' : '0 6px 7px gray';
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
    e.preventDefault();
    const targetElement = e.target as HTMLDivElement;
    targetElement.style.boxShadow = 'none';

    const sourceCard = currentCard;
    const sourceItem = currentItem as Card;

    if (sourceCard === board) {
      const currentIndex = sourceCard?.items.indexOf(sourceItem);
      sourceCard?.items.splice(currentIndex as number, 1);
      const targetIndex = e.clientY < targetElement.getBoundingClientRect().top + targetElement.offsetHeight / 2
        ? board.items.indexOf(board.items[0])
        : board.items.length;

      board.items.splice(targetIndex, 0, sourceItem);
      updatedCards(sourceCard);
      updatedCards(board);
    } else {
      sourceCard?.items.splice(sourceCard?.items.indexOf(sourceItem) as number, 1);
      board.items.push(sourceItem);
      updatedCards(sourceCard as Cards);
      updatedCards(board);
    }

    setCurrentCard(null);
    setCurrentItem(null);
  }

  return (
  <>
    {cards?.map((el: Cards) => (
      <div className="board__cards__item"
        key={el.title}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropCardHandler(e, el)}
      >
        <CardTitle el={el}/>
        <div className="board__cards__item__container">
          {el.items.map((item: Card) => (
              <CardItem
                key={item.title}
                el={el}
                item={item}
                dragEndHandler={dragEndHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragOverHandler={dragOverHandler}
                dragStartHandler={dragStartHandler}
                updatedDescRef={updatedDescRef}
                updatedTitleRef={updatedTitleRef}
              />
            )
          )}
          {el.title == 'ToDo' && newCards?.map(item => (
            <CustomCard
              key={item.title}
              el={el}
              item={item}
              titleRef={titleRef}
              descRef={descRef}
              board={board}
              dragEndHandler={dragEndHandler}
              dragLeaveHandler={dragLeaveHandler}
              dragOverHandler={dragOverHandler}
              dragStartHandler={dragStartHandler} 
              cards={cards}
              setCards={setCards}
              setIsCreated={setIsCreated}
              setNewCards={setNewCards}
            />
          ))}
          {!isCreated && el.title == 'ToDo' && (
            <AddCardItem  setIsCreated={setIsCreated} setNewCards={setNewCards}/>
          )}
        </div>
      </div>
    ))}
  </>
  )
}

export default CardList
