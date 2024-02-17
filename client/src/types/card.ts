export type CardState = 'ToDo' | 'InProgress' | 'Done'

export type Cards = {
  title: string
  items: Card[]
}

export type Card = {
  _id?: string;
  title: string;
  description: string;
  columnType: CardState;
  priority: number;
  createdAt: Date;
  dashboard: string;
}

export type UpdateCard = {
  prevTitle: string;
  title: string;
  description: string;
}