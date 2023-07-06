import React from "react";
import EditProfilePopup from "./EditProfilePopup";

function PopupWithForm({title, name, children, isOpen, textButton, onClose, onSubmit }) {

  return (
    <div
      className={`popup popup_type_${name} ${
        isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__form">
        <button
          className={`popup__close popup__close_type_${name}`}
          onClick={onClose}
          type="button"
        ></button>
        <form className="card-form" name={name} id={`${name}-form`} onSubmit={onSubmit}>
          <h2 className="card-form__title">{title}</h2>
          {children}
          <button
            className="card-form__save"
            type="submit"
          >
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}
//disabled
// card-form__save_disabled

export default PopupWithForm;
