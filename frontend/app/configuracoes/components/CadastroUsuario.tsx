"use client";

import { useState } from "react";
import styles from "./cadastroUsuario.module.css";

export default function CadastroUsuario() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className={styles.container}>
      <form className={styles.card}>
        <h2>Cadastro de Usuário</h2>

        <label className={styles.label}>Nome*</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Digite o nome"
        />

        <label className={styles.label}>Sobrenome*</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Digite o sobrenome"
        />

        <label className={styles.label}>E-mail*</label>
        <input
          type="email"
          className={styles.input}
          placeholder="Digite o e-mail"
        />

        <label className={styles.label}>Tipo de Perfil*</label>
        <div className={styles.inputWrapper}>
          <select className={styles.inputWithIcon}>
            <option>Usuário Comum</option>
            <option>Administrador</option>
            <option>Master</option>
          </select>
        </div>

        <label className={styles.label}>Senha*</label>
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            className={styles.inputWithIcon}
            placeholder="Digite a senha"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.iconButton}
          >
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 2 12 2 12a18.49 18.49 0 0 1 5.06-6.94" />
                  <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.46 18.46 0 0 1-3.22 4.51" />
                  <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        </div>

        <label className={styles.label}>Confirmar Senha*</label>
        <div className={styles.inputWrapper}>
          <input
            type={showConfirm ? "text" : "password"}
            className={styles.inputWithIcon}
            placeholder="Confirme a senha"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className={styles.iconButton}
          >
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showConfirm ? (
                <>
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 2 12 2 12a18.49 18.49 0 0 1 5.06-6.94" />
                  <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 10 8 10 8a18.46 18.46 0 0 1-3.22 4.51" />
                  <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          Cadastrar Usuário
        </button>
      </form>
    </div>
  );
}
