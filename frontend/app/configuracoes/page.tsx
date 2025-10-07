"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import dash from "../dashboard/dashboard.module.css";
import styles from "./configuracoes.module.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function ConfiguracoesPage() {
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
    <div className={dash.shell}>
      {/* Sidebar lateral */}
      <aside className={dash.sidebar}>
        <div className={dash.menuTitle}>Menu Principal</div>
        <nav className={dash.nav}>
          <a href="/dashboard" className={dash.navItem}>
            Dashboard
          </a>
          <a href="/acoes" className={dash.navItem}>
            Ações
          </a>
          <a href="/acoes" className={dash.navItem}>
            Gestão de Tarefas
          </a>
          <a href="#" className={dash.navItem}>
            Cadastro
          </a>
          <a href="#" className={dash.navItem}>
            Financeiro
          </a>
          <a href="#" className={dash.navItem}>
            Eleições 2026
          </a>
          <a href="/configuracoes" className={`${dash.navItem} ${dash.active}`}>
            Configurações
          </a>
        </nav>

        <button
          className={dash.logout}
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Sair
        </button>
      </aside>

      {/* Área principal */}
      <div className={dash.main}>
        <main className={dash.content}>
          <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
              <h1>Configurações</h1>
              <p>Gerencie suas configurações de usuário</p>
            </div>

            {/* Abas */}
            <div className={styles.tabs}>
              <span className={`${styles.tab} ${styles.active}`}>
                Alteração de Senha
              </span>
              <span className={styles.tab}>Cadastro de Usuário</span>
              <span className={styles.tab}>Administração de Usuários</span>
            </div>

            {/* Card de formulário */}
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
          </div>
        </main>
      </div>
    </div>
  );
}
