import { QueryClient, useMutation } from "@tanstack/react-query"
import { deleteBoard } from "../../services/boards"

export const useDeleteBoard = (client: QueryClient) => {
  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['boards']})
    }
  })
}