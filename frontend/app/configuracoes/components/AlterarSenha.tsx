"use client";

import { useState, useEffect } from "react";
// Importando o mesmo CSS do Cadastro para garantir o visual idêntico
import styles from "./cadastroAlterar.module.css"; 

export default function AlterarSenha() {
  // Lógica de Dados
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [userId, setUserId] = useState<string | null>(null);

  // Lógica Visual (Mostrar/Ocultar senha)
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Carrega ID do usuário
  useEffect(() => {
    const storedId = localStorage.getItem('usuarioId') || localStorage.getItem('userId') || localStorage.getItem('id');
    if (storedId) {
      setUserId(storedId);
    } else {
      setUserId('1'); // Fallback para teste
    }
  }, []);

  const handleSalvar = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Previne recarregar a página se for submit de form

    if (!userId) {
      setMensagem({ tipo: 'erro', texto: 'Erro: Usuário não identificado.' });
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setMensagem({ tipo: 'erro', texto: 'As novas senhas não coincidem.' });
      return;
    }

    try {
      const token = localStorage.getItem('token'); 
      const url = `http://localhost:8082/usuarios/${userId}/alterar-senha`;
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          senhaAtual: senhaAtual,
          novaSenha: novaSenha
        })
      });

      if (response.ok) {
        const sucessoTexto = await response.text();
        setMensagem({ tipo: 'sucesso', texto: sucessoTexto || 'Senha alterada com sucesso!' });
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
      } else {
        const erroTexto = await response.text();
        setMensagem({ tipo: 'erro', texto: erroTexto || 'Erro ao alterar senha.' });
      }
    } catch (error) {
      console.error(error);
      setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor.' });
    }
  };

  return (
    <div className={styles.container}>
      {/* Usando exatamente as mesmas classes do Cadastro */}
      <form className={styles.card} onSubmit={handleSalvar}>
        <h2 className={styles.cardTitle}>Alteração de Senha</h2>

        {/* Mensagem de Erro/Sucesso estilizada */}
        {mensagem.texto && (
          <div style={{ 
            padding: '10px', 
            marginBottom: '15px', 
            borderRadius: '6px', 
            fontSize: '0.9rem',
            textAlign: 'center',
            backgroundColor: mensagem.tipo === 'erro' ? '#fee2e2' : '#dcfce7',
            color: mensagem.tipo === 'erro' ? '#b91c1c' : '#15803d',
            border: `1px solid ${mensagem.tipo === 'erro' ? '#fecaca' : '#bbf7d0'}`
          }}>
            {mensagem.texto}
          </div>
        )}

        {/* --- SENHA ATUAL --- */}
        <label className={styles.label}>Senha Atual*</label>
        <div className={styles.inputWrapper}>
          <input
            type={showSenhaAtual ? "text" : "password"}
            className={styles.inputWithIcon}
            placeholder="Digite sua senha atual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowSenhaAtual(!showSenhaAtual)}
            className={styles.iconButton}
          >
            {/* Ícone do Olho (Copiado do seu arquivo) */}
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showSenhaAtual ? (
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

        {/* --- NOVA SENHA --- */}
        <label className={styles.label}>Nova Senha*</label>
        <div className={styles.inputWrapper}>
          <input
            type={showNovaSenha ? "text" : "password"}
            className={styles.inputWithIcon}
            placeholder="Digite a nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowNovaSenha(!showNovaSenha)}
            className={styles.iconButton}
          >
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showNovaSenha ? (
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

        {/* --- CONFIRMAR SENHA --- */}
        <label className={styles.label}>Confirmar Senha*</label>
        <div className={styles.inputWrapper}>
          <input
            type={showConfirm ? "text" : "password"}
            className={styles.inputWithIcon}
            placeholder="Confirme a senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className={styles.iconButton}
          >
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          Salvar Nova Senha
        </button>
      </form>
    </div>
  );
}