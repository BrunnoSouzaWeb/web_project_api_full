import React from "react";
import PopupWithForm from "./PopupWithForm";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const [link, setLink] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  const [isPatching, setIsPatching] = React.useState(false);

  React.useEffect(() => {
    setLink(currentUser.avatar);
  }, [currentUser]);

  React.useEffect(() => {
    if (!isOpen) {
      setIsPatching(false);
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsPatching(true);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Alterar a foto do perfil"
      name="form-avatar"
      formClass={"popup__avatar-form"}
      headerClass={"popup__avatar-header"}
      buttonClass={"popup__avatar-button-create"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textBtn={isPatching ? "Salvando..." : "Salvar"}
    >
      <input
        className="popup__avatar-url popup__input"
        id="input-link"
        placeholder="Link da imagem"
        type="url"
        name="avatarLink"
        ref={avatarRef}
        defaultValue={link}
        required
      />
      <p className="popup__error-visible input-link-error"></p>
    </PopupWithForm>
  );
}
