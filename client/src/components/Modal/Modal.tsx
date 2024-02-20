import { ReactElement, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import { error } from '../../helpers/toastHelper';
import { useCreateBoard } from '../../hooks/boards';

import CreateBoard from '../BoardComponents/Button/CreateBoard';
import '../../assets/styles/modal.scss'
import "react-toastify/dist/ReactToastify.css";

function Modal(): ReactElement {
  const client = useQueryClient();

  const [modal, setModal] = useState<boolean>(false);

  const boardNameRef = useRef<HTMLInputElement | null>(null);

  const { mutate: create } = useCreateBoard(client)

  function toggleModal(): void {
    setModal(!modal);
  };

  function handleCreateBoardClick(): void {
    const boardName = boardNameRef.current?.value

    if (boardName == "" || boardName == null) {
      error("Please fill out the information")
    } 
    else {
      create(boardName);
      setModal(!modal);
    }
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <CreateBoard handleAddBoardClick={toggleModal} />

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Please fill out complete information</h2>
            <div className='input__section'>
              <label>Board Name: </label>
              <input type="text" placeholder='Please enter board name' ref={boardNameRef}/>
            </div>
            <button className='create-btn' onClick={handleCreateBoardClick}>Create</button>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal
