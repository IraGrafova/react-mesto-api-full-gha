import React, { useEffect } from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  React.useEffect(() => {
    ref.current.value = ""
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      textButton="Сохранить"
      idButton="edit-avatar"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="card-form__input"
        type="url"
        name="avatar"
        id="avatar-link"
        placeholder="Ссылка на изображение"
        required
        ref={ref}
      />
      <span className="error" id="avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
