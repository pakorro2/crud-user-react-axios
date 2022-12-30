import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import UserCard from "./components/UserCard";
import UsersForm from "./components/UsersForm";
import Loading from "./components/Loading";

const baseURL = "https://api-users-sample.pakodev.site";

function App() {
  //Estado para guardar la info del usuario
  const [users, setUsers] = useState();
  //Estado para guardar la info del usuario obtenida de la Api para editar
  const [updateInfo, setUpdateInfo] = useState();
  //Estado que sirve para guardar la clase que oculta el form
  const [closeForm, setCloseForm] = useState(true);
  //Estado para guardar el estado del loader
  const [loading, setLoading] = useState(false);
  //Estado que sirve para guardar los errores

  //Se obtinen todos los usuarios de la api (GET)
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`;
    setLoading(true);
    axios
      .get(URL)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  //Controlamos el renderizado de la vista
  useEffect(() => {
    getAllUsers();
  }, []);

  // Funcion que crea el usuario en la base de datos de la API (POST)
  const createNewUsers = (data) => {
    const URL = `${baseURL}/users/`;
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data);
        // Actualiza la vista despue de crea el usuaio(getAllUsers)
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  // Funcion que elimina el usuario en la base de datos de la API (DELETE)
  const deletedUserById = (id) => {
    const URL = `${baseURL}/users/${id}/`;
    axios
      .delete(URL)
      .then((res) => {
        console.log(res.data);
        // Actualiza la vista despue de borrar el usuaio
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };
  // Funcion que Actualiza el usuario en la base de datos de la API (PATCH)
  const editUsersById = (id, data) => {
    const URL = `${baseURL}/users/${id}/`;
    axios
      .patch(URL, data)
      .then((res) => {
        console.log(res.data);
        // Actualiza la vista despue de editar el usuaio
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  // Funcion para abrir formulario desde boton crear nuevo usuario
  const handleOpenForm = () => {
    setUpdateInfo();
    setCloseForm(false);
  };

  return (
    <div className="App">
      <div className="app__container-ttbt">
        <h1 className="App__title">Users Crud</h1>
        <button onClick={handleOpenForm} className="App__btn">
          Create New User<i className="btn__add fa-solid fa-plus"></i>
        </button>
      </div>
      <div className={`form__content ${closeForm && "disable__form"}`}>
        <UsersForm
          createNewUsers={createNewUsers}
          updateInfo={updateInfo}
          editUsersById={editUsersById}
          setUpdateInfo={setUpdateInfo}
          setCloseForm={setCloseForm}
        />
      </div>
      <div className="card__content">
        {loading ? (
          <Loading />
        ) : (
          users?.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              deletedUserById={deletedUserById}
              setUpdateInfo={setUpdateInfo}
              setCloseForm={setCloseForm}
            />
          ))
        )}
      </div>
      <footer className="App__footer">
        <p className="App__copywrite">Creado con ❤ por Pako Cárdenas</p>
      </footer>
    </div>
  );
}

export default App;
