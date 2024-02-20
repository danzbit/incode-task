import { QueryClient, useMutation } from "@tanstack/react-query"
import { updateCards } from "../../services/cards"

export const useUpdateCards = (client: QueryClient) => {
  return useMutation({
    mutationFn: updateCards,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['boardCards', 'boards'] })
    }
  })
}