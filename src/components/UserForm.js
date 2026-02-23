"use client";
import { useState } from "react";
import api from "../services/api";
import styles from "./Register.module.css";

const UserForm = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("/users", form);
      setSuccess("Usuário cadastrado com sucesso!");
      setForm({ name: "", email: "" });
    } catch {
      setError("Erro ao criar usuário");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["register-form"]}>
      <h2>Registrar</h2>
      <input
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <button type="submit">Criar usuário</button>
      <button type="button" onClick={onSwitchToLogin}>
        Já tem conta? Faça login
      </button>
      {error && <p>{error}</p>}
      {success && <p style={{ color: "#00bfae" }}>{success}</p>}
    </form>
  );
};

export default UserForm;
