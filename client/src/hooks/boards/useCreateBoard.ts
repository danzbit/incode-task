import { QueryClient, useMutation } from "@tanstack/react-query"
import { createBoard } from "../../services/boards"

export const useCreateBoard = (client: QueryClient) => {
  return useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['boards']})
    }
  })
}