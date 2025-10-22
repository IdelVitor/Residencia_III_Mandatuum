"use client";

import React from 'react';
import styles from './administracaoUsuarios.module.css';

export default function AdministracaoUsuarios() {
  const usuarios = [
    {
      nome: 'Administrador Sistema',
      email: 'administrador@sistemalocal',
      perfil: 'Administrador',
      criadoEm: '11/05/2025',
      ultimoAcesso: '10/05/2025 - Página Login',
    },
    {
      nome: 'Everton Luiz Brito Filho',
      email: 'everton@exemplo.com',
      perfil: 'Usuário Comum',
      criadoEm: '12/06/2025',
      ultimoAcesso: '20/10/2025 - Página Dashboard',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Administração de Usuários</h2>
        <p className={styles.subtitle}>
          Gerencie usuários e suas permissões de acesso no sistema.
        </p>

        <input
          type="text"
          placeholder="Pesquisar usuário por nome ou e-mail"
          className={styles.input}
        />

        <div className={styles.userList}>
          {usuarios.map((user, index) => (
            <div key={index} className={styles.userCard}>
              <div>
                <p><strong>Nome:</strong> {user.nome}</p>
                <p><strong>E-mail:</strong> {user.email}</p>
                <p><strong>Perfil:</strong> {user.perfil}</p>
                <p><strong>Data de Criação:</strong> {user.criadoEm}</p>
                <p><strong>Último Acesso:</strong> {user.ultimoAcesso}</p>
              </div>
              <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.edit}`}>Editar</button>
                <button className={`${styles.btn} ${styles.reset}`}>Redefinir Senha</button>
                <button className={`${styles.btn} ${styles.delete}`}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
