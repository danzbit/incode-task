import { useQuery } from "@tanstack/react-query"
import { fetchCardsByBoardId } from "../services/cards"

const useCardsByBoardIdQuery = (boardId: string) => {
  return useQuery({
    queryFn: () => fetchCardsByBoardId(boardId),
    queryKey: ['boardCards', boardId],
    staleTime: 1000 * 5,
  })
}

export { useCardsByBoardIdQuery }