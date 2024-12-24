import React from "react";
import close from "../images/Close-icon.svg";
import iconSuccess from "../images/sucesso.png";
import iconError from "../images/erro.png";

const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
  const icon = isSuccess ? iconSuccess : iconError;
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__close-icon" onClick={onClose}>
          <img
            className="modal__close-icon-img"
            src={close}
            alt="ìcone para fechar o pop-up"
          />
        </button>
        <img
          className={`modal__icon ${
            isSuccess ? "modal__icon_success" : "modal__icon_error"
          }`}
          src={icon}
          alt=""
        />

        <p
          className={`modal__message ${
            isSuccess ? "modal__message_success" : "modal__message_error"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
