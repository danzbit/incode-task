import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteCard } from "../../services/cards";

export const useDeleteCard = (client: QueryClient) => {
  return useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['boardCards'] })
    }
  })
}