import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import '../assets/styles/userForm.css'

const defaulValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: '',
}

const UsersForm = ({ createNewUsers, updateInfo, editUsersById, setUpdateInfo, setCloseForm }) => {

  //Uso de hook useForm para controlar la entrada te datos de form
  const { handleSubmit, reset, register } = useForm()

  //Con este hook contolamos cuando el formulario edita (POST update)
  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo)
    }
  }, [updateInfo])

  //Funcion para decirle al formulario si los datos ingresados son 
  //spara crear un nuevo registro o editarlo
  //Si lo edita carga los datos de ese registro en el foormulario
  const submit = data => {

    if (updateInfo) {
      //Editar usuario
      editUsersById(updateInfo.id, data)
      setUpdateInfo()
    } else {
      //Crear usuario
      createNewUsers(data)
    }
    reset(defaulValues)
    setCloseForm(true)
  }
  // Funcion para cerrar formulario
  const handleCloseForm = () => {
    setCloseForm(true)
    reset(defaulValues)
  }
  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
      <i onClick={handleCloseForm} className="form__close fa-solid fa-circle-xmark"></i>
      <h2 className='form__title'>{updateInfo ? 'Edit User' : 'New User'}</h2>
      <div className="form__element">
        <label className="form__label" htmlFor="email">Email</label>
        <input className="form__input" type="email" id="email" placeholder="Enter email"{...register("email")} />
      </div>
      <div className="form__element">
        <label className="form__label" htmlFor="password">Password</label>
        <input className="form__input" type="password" id="password" placeholder="Enter password" {...register("password")} />
      </div>
      <div className="form__element">
        <label className="form__label" htmlFor="first_name">First Name</label>
        <input className="form__input" type="text" id="first_name" placeholder="Enter first name" {...register("first_name")} />
      </div>
      <div className="form__element">
        <label className="form__label" htmlFor="last_name">Last Name</label>
        <input className="form__input" type="text" id="last_name" placeholder="Enter last name" {...register("last_name")} />
      </div>
      <div className="form__element">
        <label className="form__label" htmlFor="birthday">Birthday</label>
        <input className="form__input" type="date" id="birthday" {...register("birthday")} />
      </div>
      <button className='form__btn'>{updateInfo ? 'Edit' : 'Create'}</button>
    </form>
  )
}

export default UsersForm