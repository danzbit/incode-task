import { ReactElement } from 'react'
import { CardContainerProps } from './types';

function CardContainer({
  el,
  item,
  children,
  dragOverHandler,
  dragLeaveHandler,
  dragStartHandler,
  dragEndHandler
}: CardContainerProps): ReactElement {
  return (
    <div
    onDragOver={(e) => dragOverHandler(e)}
    onDragLeave={(e) => dragLeaveHandler(e)}
    onDragStart={() => dragStartHandler(el, item)}
      onDragEnd={(e) => dragEndHandler(e)}
    className="card__container item"
    draggable={true}
  >
    {children}
  </div>
  )
}

export default CardContainer
