import { useQueryClient } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { DeleteBoardButton } from './types';
import { useDeleteBoard } from '../../../hooks/boards';

function DeleteBoard({ id }: DeleteBoardButton): ReactElement {
  const client = useQueryClient();

  const { mutate: deleteBoard } = useDeleteBoard(client);

  function handleDeleteClick() {
    deleteBoard(id)
  }

  return (
    <button onClick={handleDeleteClick}>Delete Board</button>
  )
}

export default DeleteBoard
