"use client";

import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styles from "../configuracoes.module.css";

export default function CadastroUsuario() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  return (
    <form className={styles.form}>
      <h2 className={styles.subtitle}>Cadastro de Usuário</h2>

      <div className={styles.row}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Nome*</label>
          <input type="text" className={styles.input} placeholder="Digite o nome" required />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Sobrenome*</label>
          <input type="text" className={styles.input} placeholder="Digite o sobrenome" required />
        </div>
      </div>

      <label className={styles.label}>E-mail*</label>
      <input type="email" className={styles.input} placeholder="Digite o e-mail" required />

      <label className={styles.label}>Tipo de Perfil*</label>
      <select className={styles.select}>
        <option>Usuário Comum</option>
        <option>Administrador</option>
        <option>Master</option>
      </select>

      <label className={styles.label}>Senha*</label>
      <div className={styles.passwordWrapper}>
        <input
          type={mostrarSenha ? "text" : "password"}
          className={styles.input}
          placeholder="Digite a senha"
          required
        />
        <span
          className={styles.eyeIcon}
          onClick={() => setMostrarSenha(!mostrarSenha)}
        >
          {mostrarSenha ? <IoMdEyeOff /> : <IoMdEye />}
        </span>
      </div>

      <label className={styles.label}>Confirmar Senha*</label>
      <div className={styles.passwordWrapper}>
        <input
          type={mostrarConfirmar ? "text" : "password"}
          className={styles.input}
          placeholder="Confirme a senha"
          required
        />
        <span
          className={styles.eyeIcon}
          onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
        >
          {mostrarConfirmar ? <IoMdEyeOff /> : <IoMdEye />}
        </span>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Cadastrar Usuário
        </button>
      </div>
    </form>
  );
}
