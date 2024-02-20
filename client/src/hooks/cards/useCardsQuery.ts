import { useQuery } from "@tanstack/react-query"
import { fetchCards } from "../../services/cards"

export const useCardsQuery = () => {
  return useQuery({
    queryFn: () => fetchCards(),
    queryKey: ['cards'],
    staleTime: 1000 * 5,
  })
}
