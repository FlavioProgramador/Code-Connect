"use client";
import { useState } from "react";
import api from "../services/api";
import styles from "./Login.module.css";

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Busca usuário pelo email
      const res = await api.get("/users");
      const user = res.data.find((u) => u.email === email);
      if (user) {
        onLogin(user);
      } else {
        setError("Usuário não encontrado. Cadastre-se primeiro.");
      }
    } catch {
      setError("Erro ao buscar usuário");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2 className={styles["h2"]}>Login</h2>
      <input
        type="email"
        placeholder="Seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
      <button type="button" onClick={onSwitchToRegister}>
        Não tem conta? Cadastre-se
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
