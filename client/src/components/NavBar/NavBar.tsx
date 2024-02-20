import { ReactElement } from 'react'
import { NavBarProps } from './types';

import LoadInput from '../Input/LoadInput'
import '../../assets/styles/navbar.scss'
import Modal from '../Modal/Modal';

function NavBar({ boardId, setBoardId }: NavBarProps): ReactElement {
  return (
    <nav className='navbar__container'>
      <div className='search__container'>
        <LoadInput value={boardId} onChange={(e) => setBoardId(e.target.value)} />
      </div>
      <div className="create__board__container">
        <Modal />
      </div>
    </nav>
  )
}

export default NavBar
