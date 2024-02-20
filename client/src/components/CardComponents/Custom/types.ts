import { MutableRefObject } from "react";
import { CommonCardProps } from "../../../types/commonProps";
import { Card, Cards } from "../../../types/card";

export type CustomCardProps = CommonCardProps & {
  titleRef: MutableRefObject<HTMLInputElement | null>;
  descRef: MutableRefObject<HTMLInputElement | null>;
  board: {
    _id: string;
    name: string;
  };
  cards: Cards[]
  setCards: React.Dispatch<React.SetStateAction<Cards[]>>;
  setNewCards: React.Dispatch<React.SetStateAction<Card[] | undefined>>
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
}