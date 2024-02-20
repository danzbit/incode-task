import { ReactNode } from "react";
import { CommonCardProps } from "../../../types/commonProps";

export type CardContainerProps = CommonCardProps & {
  children: ReactNode;
}
