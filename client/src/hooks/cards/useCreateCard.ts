import { QueryClient, useMutation } from "@tanstack/react-query"
import { createCard } from "../../services/cards"

export const useCreateCard = (client: QueryClient) => {
  return useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['boardCards', 'boards'] })
    }
  })
}