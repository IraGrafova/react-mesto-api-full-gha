import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div
      className={`popup popup_type_open-picture > ${
        card ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__form-picture">
        <button
          className="popup__close popup__close_type_open-picture"
          onClick={onClose}
          type="button"
        ></button>
        <figure className="popup__image-open">
          <img
            className="popup__image"
            src={`${card?.link}`}
            alt={`${card?.name}`}
          />
          <figcaption className="popup__caption">{`${
            card ? card.name : ""
          }`}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
