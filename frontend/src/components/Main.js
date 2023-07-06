import React from "react";
import { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onCardClick,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardLike,
  onTrashClick,
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile-data">
          <button
            className="button-edit-avatar"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              className="avatar"
              alt="Аватар пользователя"
              src={`${currentUser?.avatar}`}
            />
          </button>
          <div className="profile-info">
            <div className="profile-info__name">
              <h1 className="profile-info__title">{`${currentUser?.name}`}</h1>
              <button
                className="profile-info__edit-button"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile-info__subtitle">{`${currentUser?.about}`}</p>
          </div>
        </div>
        <button
          className="add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="snapshots">
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onTrashClick={onTrashClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
