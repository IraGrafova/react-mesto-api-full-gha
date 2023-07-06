import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";

import Error from "../images/error.svg";
import Success from "../images/tick.svg";

function App() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = React.useState("");

  const [loggedIn, setLoggedIn] = React.useState(false);

  //состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  //открытие попапов
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //закрытие всех попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  //лайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .putLike(card._id, isLiked)
      .then((newCard) => {
        setCards(
          (
            state //в state хранятся карточки из setCards
          ) =>
            state.map((oldCard) =>
              oldCard._id === card._id ? newCard : oldCard
            )
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  //удаление карточек
  function handleCardDelete(card) {
    // Отправляем запрос в API и после ответа фильтруем исходные карточки, удаляя ту, с которой совпали id
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        alert(err);
      });
  }

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getAllCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleUpdateUser(updateData) {
    api
      .editUserInfo(updateData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleUpdateAvatar(updateData) {
    api
      .editAvatar(updateData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .saveCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleLogin(userEmail) {
    setLoggedIn(true);
    setUserEmail(userEmail);
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.jwt(token)
        .then((data) => {
          handleLogin(data.data.email);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  function handleRegister() {
    setIsInfoTooltipOpen(true);
  }

  const [isTooltipPopup, setIsTooltipPopup] = React.useState({
    img: "",
    text: "",
  });

  function handleError() {
    console.log("error");
    setIsTooltipPopup({
      img: Error,
      text: `Что-то пошло не так!
            Попробуйте ещё раз.`,
    });
  }

  function handleSuccess() {
    console.log("success");
    setIsTooltipPopup({
      img: Success,
      text: `Вы успешно зарегистрировались!`,
    });
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} userEmail={userEmail} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onCardClick={setSelectedCard}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardLike={handleCardLike}
                  onTrashClick={handleCardDelete}
                />
              }
            />

            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route
              path="/sign-up"
              element={
                <Register
                  handleRegister={handleRegister}
                  handleSuccess={handleSuccess}
                  handleError={handleError}
                />
              }
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>

          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <InfoTooltip
            name="info"
            isTooltipPopup={isTooltipPopup}
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
          />
          <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            textButton="Да"
            idButton="delete-card"
            onClose={closeAllPopups}
          ></PopupWithForm>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
