import { useQuery } from "@tanstack/react-query"
import { fetchBoards } from "../services/boards"

const useBoardsQuery = () => {
  return useQuery({
    queryFn: () => fetchBoards(),
    queryKey: ['boards'],
    staleTime: 1000 * 5,
  })
}

export { useBoardsQuery }