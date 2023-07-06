import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-picture"
      isOpen={isOpen}
      textButton="Создать"
      idButton="create-card"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="card-form__input"
        type="text"
        name="name"
        id="place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name ?? ""}
        onChange={handleChangeName}
      />
      <span className="error" id="place-error"></span>
      <input
        className="card-form__input"
        type="url"
        name="link"
        id="place-link"
        placeholder="Ссылка на картинку"
        required
        value={link ?? ""}
        onChange={handleChangeLink}
      />
      <span className="error" id="place-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
