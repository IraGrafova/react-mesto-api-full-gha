import React from "react";
import { useEffect } from "react";

function InfoTooltip({ isOpen, onClose, name, isTooltipPopup }) {

  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__form">
        <button
          className={`popup__close popup__close_type_${name}`}
          onClick={onClose}
          type="button"
        ></button>
        <form className="card-form" name={name} id={`${name}-form`}>
          <img
            className="card-form__img"
            src={isTooltipPopup.img}
            alt={isTooltipPopup.text}
          />
          <h2 className="card-form__info-title">{isTooltipPopup.text}</h2>
        </form>
      </div>
    </div>
  );
}
export default InfoTooltip;
