import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(email, password)
      .then((response) => {
        handleLogin(response.email, response.token);

        navigate("/");
      })
      .catch((error) => {
        console.error("Login error:", error);
        setShowModal(true);
        setIsSuccess(false);
        setMessage(
          `Ops, algo saiu deu errado! Por favor, tente novamente. ${error.message}`
        );
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setIsSuccess(false);
    setMessage("");

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (!showModal && isSuccess) {
      navigate("/signin");
    }
  }, [showModal, isSuccess, navigate]);

  return (
    <div className="login">
      <h2 className="login__welcome">Entrar</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          className="login__input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          className="login__input"
        />
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Entrar
          </button>
        </div>
      </form>
      <p className="login__signin">
        Ainda não é membro?{" "}
        <Link className="link" to="/signup">
          Inscreva-se aqui!
        </Link>
      </p>
      <InfoTooltip
        isOpen={showModal}
        onClose={closeModal}
        isSuccess={isSuccess}
        message={message}
      />
    </div>
  );
};

export default Login;
