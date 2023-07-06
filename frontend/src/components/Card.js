import React from "react";
import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onTrashClick }) {

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === `${currentUser?._id}`;

  //Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  //Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__button-like ${
    isLiked && "element__button-like_active"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onTrashClick(card);
  }

  return (
    <li className="element">
      {isOwn && (
        <button className="element__trash" onClick={handleCardDelete}></button>
      )}
      <button className="button-image">
        <img
          className="element__picture"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
      </button>
      <div className="element__label">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-sum">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
