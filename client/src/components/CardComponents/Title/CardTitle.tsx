import { ReactElement } from 'react'
import { CardTitleProps } from './types';

function CardTitle({el}: CardTitleProps): ReactElement {
  return (
    <div className="board__cards__item__title">
      <p>{el.title}</p>
    </div>
  )
}

export default CardTitle
