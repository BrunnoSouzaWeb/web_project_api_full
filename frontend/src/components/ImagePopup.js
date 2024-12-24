import close from "../images/Close-icon.svg";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-image ${card ? "popup__open" : ""}`}>
      <div className="popup__overlay"></div>
      <div className="popup__image-content">
        <img
          src={close}
          alt="Botão Fechar"
          className="popup__image-button-closed"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="popup__image-photo" />
        <p className="popup__image-name">{card.name}</p>
      </div>
    </div>
  );
}
