"use client";

import React, { useState, useEffect } from 'react';
import styles from './administracaoUsuarios.module.css';

// Interface para tipar os dados que vêm do Backend
interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: string;
  criadoEm?: any; // Pode vir como array [2025, 5, 10] ou string
}

export default function AdministracaoUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  // --- 1. BUSCAR USUÁRIOS (GET) ---
  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Tentando buscar usuários em: http://localhost:8082/usuarios");

      const response = await fetch('http://localhost:8082/usuarios', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Dados recebidos:", data); // Verifique no Console (F12) se os dados aparecem
        setUsuarios(data);
      } else {
        console.error("Erro ao buscar usuários. Status:", response.status);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // --- 2. EXCLUIR USUÁRIO (DELETE) ---
  const handleExcluir = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8082/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert("Usuário excluído com sucesso.");
        fetchUsuarios(); // Recarrega a lista
      } else {
        alert("Erro ao excluir usuário.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    }
  };

  // --- 3. REDEFINIR SENHA (PUT) ---
  const handleRedefinirSenha = async (id: number) => {
    const novaSenha = prompt("Digite a nova senha para este usuário:");
    if (!novaSenha) return;

    try {
      const token = localStorage.getItem('token');
      // Enviamos apenas a senhaHash para atualizar
      const payload = { senhaHash: novaSenha };

      const response = await fetch(`http://localhost:8082/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Senha redefinida com sucesso!");
      } else {
        alert("Erro ao redefinir senha.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    }
  };

  // --- HELPERS ---
  
  // Filtro de pesquisa
  const usuariosFiltrados = usuarios.filter(user => 
    (user.nome && user.nome.toLowerCase().includes(busca.toLowerCase())) || 
    (user.email && user.email.toLowerCase().includes(busca.toLowerCase()))
  );

  // Formatar Data (Lida com Array do Java ou String ISO)
  const formatarData = (data: any) => {
    if (!data) return '-';
    // Se vier como array [2025, 5, 11, 10, 30]
    if (Array.isArray(data)) {
       const [ano, mes, dia] = data;
       return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    }
    // Se vier como string "2025-05-11..."
    return new Date(data).toLocaleDateString('pt-BR');
  };

  // Formatar Perfil
  const formatarPerfil = (role: string) => {
    switch(role) {
      case 'ADMIN': return 'Administrador';
      case 'MANAGER': return 'Master';
      case 'USER': return 'Usuário Comum';
      default: return role;
    }
  };

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
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {loading ? (
          <p className="text-center py-4">Carregando usuários...</p>
        ) : (
          <div className={styles.userList}>
            {usuariosFiltrados.length === 0 && (
              <p className="text-center text-gray-500">Nenhum usuário encontrado.</p>
            )}

            {usuariosFiltrados.map((user) => (
              <div key={user.id} className={styles.userCard}>
                <div>
                  <p><strong>Nome:</strong> {user.nome}</p>
                  <p><strong>E-mail:</strong> {user.email}</p>
                  <p><strong>Perfil:</strong> {formatarPerfil(user.role)}</p>
                  <p><strong>Data de Criação:</strong> {formatarData(user.criadoEm)}</p>
                </div>
                <div className={styles.actions}>
                  <button 
                    className={`${styles.btn} ${styles.edit}`}
                    onClick={() => alert("Funcionalidade de edição completa em breve!")}
                  >
                    Editar
                  </button>
                  
                  <button 
                    className={`${styles.btn} ${styles.reset}`}
                    onClick={() => handleRedefinirSenha(user.id)}
                  >
                    Redefinir Senha
                  </button>
                  
                  <button 
                    className={`${styles.btn} ${styles.delete}`}
                    onClick={() => handleExcluir(user.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}