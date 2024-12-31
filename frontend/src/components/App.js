import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import api from "../utils/api";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import NewCard from "../components/NewCard.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import ProtectedRoute from "../components/ProtectedRoute.js";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") ? true : false
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );

  console.log("dentro do app frontend");

  const [token, setToken] = useState(localStorage.getItem("jwt") || ""); // NOVO: Estado para armazenar o token
  //// console.log("token", setToken);
  ///const settoken = "1f012d49-8fd6-43fa-aeaf-50158ed3cf4a";
  console.log("Token atual:", token);

  const onEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  function handleUpdateUser({ name, about }) {
    api
      .updateEditPerfil(name, about)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Erro ao atualizar o perfil: ${err}`);
      });
  }

  const handleUpdateAvatar = async ({ avatar }) => {
    return await api.updateAvatar(avatar).then((updatedUserData) => {
      setCurrentUser(updatedUserData);
      closeAllPopups();
    });
  };

  const handleAddPlaceSubmit = async ({ name, link }) => {
    return await api.addNewCard(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  };

  const onEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const onAddPlaceClick = () => {
    setIsNewCardOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsNewCardOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  /*
  
  useEffect(() => {
    console.log("primeiro api getuserifo");
    api
      .getUserInfo()
      .then((ApiUserInfo) => {
        setCurrentUser(ApiUserInfo);
      })
      .catch((err) => {
        console.log("Erro ao carregar dados do usuário: ", err);
      });
  }, []);
  */

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setLoggedIn(true);
          setUserEmail(user.email);
          setCurrentUser(user);

          console.log("executou api getuserifo");
          api
            .getUserInfo()
            .then(setCurrentUser(user))
            .catch((err) => {
              console.log("Erro ao carregar dados do usuário: ", err);
            });

          console.log("executou cards");
          api
            .getInitialCards()
            .then((data) => {
              console.log("data", data);
              setCards(data);
            })
            .catch((err) =>
              console.log("Erro ao obter dados dos cartões :", err)
            );
        })
        .catch((error) => {
          console.error("Erro ao verificar token:", error);
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }, [token]); // Atualiza quando o token muda

  /*

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setLoggedIn(true);
          setUserEmail(user.email);
          setCurrentUser(user);

          console.log("executou cards");
          api
            .getInitialCards()
            .then((data) => {
              console.log("data", data);
              setCards(data);
            })
            .catch((err) =>
              console.log("Erro ao obter dados dos cartões :", err)
            );
        })
        .catch((error) => {
          console.error("Erro ao verificar token:", error);
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }, [token]); // Atualiza quando o token muda
  */

  const handleLogin = (email, jwt) => {
    console.log("dentro do handlelogin frontend app", jwt);
    setLoggedIn(true);
    setUserEmail(email);
    setToken(jwt); // Atualiza o estado do token
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail("");
    setToken(""); // Limpa o token
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
  };

  async function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    if (!card) {
      return;
    }

    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error(`Erro ao eliminar o cartao: ${err}`));
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    AddPlace={isNewCardOpen}
                    EditAvatar={isEditAvatarPopupOpen}
                    onEditProfileClick={onEditProfileClick}
                    onAddPlaceClick={onAddPlaceClick}
                    onEditAvatarClick={onEditAvatarClick}
                    closeAllPopups={closeAllPopups}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to={loggedIn ? "/" : "/signin"} />}
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <NewCard
            isOpen={isNewCardOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {selectedCard && (
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          )}
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
