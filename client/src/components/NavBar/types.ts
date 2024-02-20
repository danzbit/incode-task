import { Dispatch, SetStateAction } from "react";

export type NavBarProps = {
  boardId: string;
  setBoardId: Dispatch<SetStateAction<string>>
}
