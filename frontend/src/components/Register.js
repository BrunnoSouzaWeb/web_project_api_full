import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      auth
        .register(email, password)
        .then(() => {
          setShowModal(true);
          setIsSuccess(true);
          setMessage("Vitória! Você precisa se registrar.");
        })
        .catch((error) => {
          console.error("Erro de registro:", error);
          setShowModal(true);
          setIsSuccess(false);
          setMessage(
            `Ops, algo saiu deu errado! Por favor, tente novamente. ${error.message}`
          );
        });
    }
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
    <div className="register">
      <p className="register__welcome">Inscrever-se</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          placeholder="E-mail"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          className="register__input"
          required
        />

        <input
          placeholder="Senha"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          className="register__input"
          required
        />

        <div className="register__button-container">
          <button type="submit" className="register__button">
            Inscrever-se
          </button>
        </div>
      </form>

      <p className="register__signin">
        Já é um membro?{" "}
        <Link className="link" to="/signin">
          Faça o Login aqui!
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

export default Register;
