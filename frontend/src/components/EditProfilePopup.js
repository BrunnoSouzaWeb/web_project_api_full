import React, { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPatching, setIsPatching] = React.useState(false);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  React.useEffect(() => {
    if (!isOpen) {
      setIsPatching(false);
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsPatching(true);
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="form-perfil"
      title="Editar perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textBtn={isPatching ? "Salvando..." : "Salvar"}
    >
      <input
        type="text"
        name="name"
        className="popup__name popup__input"
        minLength="2"
        maxLength="40"
        placeholder="Nome"
        required
        defaultValue={name}
        onChange={handleChangeName}
      />
      <span className="popup__error-visible input-name-error"> </span>
      <input
        type="text"
        name="about"
        className="popup__description popup__input"
        minLength="2"
        maxLength="200"
        placeholder="Sobre"
        required
        defaultValue={description}
        onChange={handleChangeDescription}
      />
      <span className="popup__error-visible input-description-error"> </span>
    </PopupWithForm>
  );
}
