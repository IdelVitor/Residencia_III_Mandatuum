"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./alterarSenha.module.css";

export default function AlterarSenha() {
  const [showPassword, setShowPassword] = useState({
    atual: false,
    nova: false,
    confirmar: false,
  });

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Alteração de Senha</h2>

      {/* Senha Atual */}
      <label className={styles.label}>Senha atual</label>
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword.atual ? "text" : "password"}
          className={styles.input}
          placeholder="Digite sua senha atual"
        />
        <span
          className={styles.eyeButton}
          onClick={() => toggleVisibility("atual")}
        >
          {showPassword.atual ? (
            <EyeOff className={styles.eyeIcon} />
          ) : (
            <Eye className={styles.eyeIcon} />
          )}
        </span>
      </div>

      {/* Nova Senha */}
      <label className={styles.label}>Nova Senha</label>
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword.nova ? "text" : "password"}
          className={styles.input}
          placeholder="Digite a nova senha"
        />
        <span
          className={styles.eyeButton}
          onClick={() => toggleVisibility("nova")}
        >
          {showPassword.nova ? (
            <EyeOff className={styles.eyeIcon} />
          ) : (
            <Eye className={styles.eyeIcon} />
          )}
        </span>
      </div>

      {/* Confirmar Senha */}
      <label className={styles.label}>Confirmar nova senha</label>
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword.confirmar ? "text" : "password"}
          className={styles.input}
          placeholder="Confirme a nova senha"
        />
        <span
          className={styles.eyeButton}
          onClick={() => toggleVisibility("confirmar")}
        >
          {showPassword.confirmar ? (
            <EyeOff className={styles.eyeIcon} />
          ) : (
            <Eye className={styles.eyeIcon} />
          )}
        </span>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Alterar Senha
        </button>
      </div>
    </div>
  );
}
