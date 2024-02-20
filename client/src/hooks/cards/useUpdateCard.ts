import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateCard } from "../../services/cards";

export const useUpdateCard = (client: QueryClient) => {
  return useMutation({
    mutationFn: updateCard,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['boardCards'] })
    }
  })
}