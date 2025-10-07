"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../configuracoes.module.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function AlterarSenha() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Simulação: senha alterada com sucesso!");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.subtitle}>Alteração de Senha</h2>

      <label className={styles.label}>Senha atual</label>
      <input
        type="password"
        className={styles.input}
        placeholder="Digite sua senha atual"
        value={senhaAtual}
        onChange={(e) => setSenhaAtual(e.target.value)}
        required
      />

      <label className={styles.label}>Nova Senha</label>
      <div className={styles.passwordWrapper}>
        <input
          type={mostrarNovaSenha ? "text" : "password"}
          className={styles.input}
          placeholder="Digite a nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
        <span
          className={styles.eyeIcon}
          onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
        >
          {mostrarNovaSenha ? <IoMdEyeOff /> : <IoMdEye />}
        </span>
      </div>

      <label className={styles.label}>Confirmar nova senha</label>
      <div className={styles.passwordWrapper}>
        <input
          type={mostrarConfirmar ? "text" : "password"}
          className={styles.input}
          placeholder="Confirme a nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
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
          Alterar Senha
        </button>
      </div>
    </form>
  );
}
