import { Card, Cards } from "./card";

export type CommonCardProps = {
  el: Cards;
  item: Card;
  dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragStartHandler: (el: Cards, item: Card) => void;
  dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void;
};