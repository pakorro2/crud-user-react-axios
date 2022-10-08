import React from 'react'
import '../assets/styles/userCard.css'

const Useruser = ({ user, deletedUserById, setUpdateInfo, setCloseForm }) => {

  //Funcion para boton editar
  const handleEdit = () => {
    // Cargamos los datos del usuario al form
    setUpdateInfo(user)
    setCloseForm(false)
  }


  return (
    <article className='user'>
      <h2 className='user__name'>{`${user.first_name} ${user.last_name}`}</h2>
      <ul className='user__list'>
        <li className='user__item'><span className='user__span'>Email: </span>{user.email}</li>
        <li className='user__item'><span className='user__span'>Birthday: </span><div className="user__item-container"><i className="btn-gift fa-solid fa-gift"></i>{user.birthday}</div></li>
      </ul>
      <footer className='user__footer'>
        <button className='user__btn' onClick={() => deletedUserById(user.id)}><i className=" btn-delete fa-solid fa-trash-can"></i>
        </button>
        <button className='user__btn' onClick={() => handleEdit()}>
          <i className="btn-edit fa-solid fa-pen-to-square"></i>
        </button>
      </footer>
    </article>
  )
}

export default Useruser