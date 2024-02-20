import { error } from "../helpers/toastHelper";
import { Board } from "../types/board";
import { BASE } from "../utils/constants";

const BOARD_ROUTE = `${BASE}/boards`

export async function fetchBoards(): Promise<Board[] | null> {
   try {
    const res = await fetch(`${BOARD_ROUTE}`)

    if (!res.ok) throw new Error('Failed to fetch boards!')

    return res.json();
  }
  catch (err: any) {
    error(err.message);
    return null;
  }
}

export async function createBoard(name: string): Promise<Board | null> {
  try {
    const res = await fetch(`${BOARD_ROUTE}`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error('Failed to create board');
    }

    return res.json()
  }
  catch (err: any) {
    error(err.message);
    return null;
  }
}