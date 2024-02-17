import { Board } from "../types/board";
import { BASE } from "../utils/constants";

const BOARD_ROUTE = `${BASE}/boards`

export async function fetchBoards(): Promise<Board[]> {
  const res = await fetch(`${BOARD_ROUTE}`)

  if (!res.ok) throw new Error('Failed to fetch boards!')

  return res.json();
}