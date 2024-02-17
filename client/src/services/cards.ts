import { Card, Cards, UpdateCard } from "../types/card";
import { BASE } from "../utils/constants";

const CARD_ROUTE = `${BASE}/cards`

export async function fetchCards(): Promise<Cards[]> {
  const res = await fetch(`${CARD_ROUTE}`)

  if (!res.ok) throw new Error('Something bad happened with fetching')

  return res.json()
}

export async function fetchCardsByBoardId(boardId: string): Promise<Cards[]> {
  const res = await fetch(`${CARD_ROUTE}/by-board-id?boardId=${boardId}`)

  if (!res.ok) throw new Error('Something bad happened with fetching')

  return res.json()
}

export async function createCard(createCard: Card): Promise<Card> {
  console.log(createCard)
  const res = await fetch(`${CARD_ROUTE}`, {
    method: "POST",
    body: JSON.stringify({ 
      title: createCard.title,
      description: createCard.description,
      columnType: createCard.columnType,
      priority: createCard.priority,
      createdAt: createCard.createdAt,
      dashboard: createCard.dashboard
     }),
    headers: {
       'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to create card');
  }

  return res.json()
}

export async function updateCard(card: UpdateCard): Promise<Card>  {
  const res = await fetch(`${CARD_ROUTE}?title=${card.prevTitle}`, {
    method: "PATCH",
    body: JSON.stringify({ title: card.title, description: card.description }),
    headers: {
       'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to update cards');
  }

  return res.json()
}

export async function updateCards(updateCards: Cards): Promise<Card[]>  {
  const res = await fetch(`${CARD_ROUTE}?type=${updateCards.title}`, {
    method: "PUT",
    body: JSON.stringify({ items: updateCards.items }),
    headers: {
       'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to update cards');
  }

  return res.json()
}

export async function deleteCard(id?: string): Promise<Card> {
    const res = await fetch(`${CARD_ROUTE}/${id}`, {
    method: "DELETE",
    headers: {
       'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to delete cards');
  }

  return res.json()
}