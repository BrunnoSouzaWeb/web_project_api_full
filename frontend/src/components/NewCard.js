import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function NewCard({ isOpen, onClose, onAddPlaceSubmit }) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isPatching, setIsPatching] = React.useState(false);
  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsPatching(true);
    onAddPlaceSubmit({
      name: title,
      link,
    }).finally(() => {
      setIsPatching(false);
      setTitle("");
      setLink("");
    });
  }

  return (
    <PopupWithForm
      title="Novo Local"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textBtn={isPatching ? "Salvando..." : "Salvar"}
    >
      <input
        type="text"
        className="popup__card-title popup__input"
        name="name"
        minLength="2"
        maxLength="30"
        placeholder="Título"
        required
        value={title}
        onChange={handleChangeTitle}
      />
      <span className="popup__error-visible input-title-error"></span>
      <input
        id="input-url"
        type="url"
        className="popup__card-url popup__input"
        name="link"
        placeholder="Link da Imagem"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <p className="input-link-error popup__error"></p>
    </PopupWithForm>
  );
}
