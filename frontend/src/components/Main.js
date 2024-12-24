import favIcon from "../images/around.png";
import profile from "../images/profile.jpg";
import editAvatar from "../images/edit_avatar.png";
import editButtonProfile from "../images/editbuttonprofile.svg";
import addButtonProfile from "../images/addbuttonprofile.png";
import closeIcon from "../images/Close-icon.svg";
import PopupWithForm from "./PopupWithForm";
import Card from "./Card";

import { useContext } from "react";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser) return null;

  return (
    <main className="content">
      <section className="profile">
        <img src={currentUser.avatar} alt="perfil" className="profile__image" />
        <img
          src={editAvatar}
          alt="editavatar"
          className="profile__edit-avatar"
          onClick={onEditAvatarClick}
        />
        <div className="profile__info">
          <div className="profile__name">
            <p className="profile__text"> {currentUser.name} </p>
            <img
              src={editButtonProfile}
              alt="editar"
              className="profile__edit-button"
              onClick={onEditProfileClick}
            />
          </div>
          <p className="profile__profession"> {currentUser.about} </p>
        </div>
        <img
          src={addButtonProfile}
          alt="adicionar"
          className="profile__add-button"
          onClick={onAddPlaceClick}
        />
      </section>

      <section className="elements" />
      <template className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </template>

      <div className="popup" id="popup-confirmation">
        <div className="popup__overlay" />
        <form
          id="form-confirmation"
          className="popup__confirmation-form popup__form"
        >
          <img
            src={closeIcon}
            alt="Botão Fechar"
            className="popup__confirmation-button-closed"
          />
          <h2 className="popup__confirmation-header">Tem certeza?</h2>
          <button
            type="submit"
            className="popup__confirmation-button-create popup__button"
          >
            Sim
          </button>
        </form>
      </div>
    </main>
  );
}
