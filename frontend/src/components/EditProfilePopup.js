import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      textButton="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="card-form__input"
        type="text"
        name="name"
        id="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name ?? ""}
        onChange={handleChangeName}
      />
      <span className="error" id="name-error"></span>
      <input
        className="card-form__input"
        type="text"
        name="description"
        id="job"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={description ?? ""}
        onChange={handleChangeDescription}
      />
      <span className="error" id="job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
