import { ReactElement } from 'react'
import { AddCardItemProps } from './types'
import { Card, CardState } from '../../../types/card';

function AddCardItem({ setIsCreated, setNewCards }: AddCardItemProps): ReactElement {
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
  return (
    <div className='card__container card__container-last' onClick={addCard}>
      <p>+</p>
    </div>
  )
}

export default AddCardItem
