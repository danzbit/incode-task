import { MutableRefObject } from "react";
import { CommonCardProps } from "../../../types/commonProps";
import { Card } from "../../../types/card";

export type CardItemProps = CommonCardProps & {
  updatedTitleRef: MutableRefObject<HTMLInputElement | null>;
  updatedDescRef: MutableRefObject<HTMLInputElement | null>;
}

export type AddCardItemProps = {
  setNewCards: React.Dispatch<React.SetStateAction<Card[] | undefined>>
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
}