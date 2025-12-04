"use client";

import { useState } from "react";
// Importando o CSS que você definiu
import styles from "./cadastroAlterar.module.css"; 

export default function CadastroUsuario() {
  // --- Estados dos Inputs ---
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [roleVisual, setRoleVisual] = useState("Usuário Comum");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // --- Estados de Controle Visual ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [loading, setLoading] = useState(false);

  // --- Função de Mapeamento (Visual -> Backend Enum) ---
  const getRoleEnum = (valorVisual: string) => {
    switch (valorVisual) {
      case "Administrador": return "ADMIN";
      case "Master": return "MANAGER"; 
      default: return "USER"; 
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    // 1. Validação do Front
    if (!nome || !sobrenome || !email || !senha) {
      setMensagem({ tipo: 'erro', texto: 'Por favor, preencha todos os campos obrigatórios.' });
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem({ tipo: 'erro', texto: 'As senhas não coincidem.' });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // LOG DE DIAGNÓSTICO (Para você ver no F12 se o token está indo)
      console.log("Token sendo enviado:", token);

      // 2. Montagem do Objeto (Payload)
      const payload = {
        nome: `${nome.trim()} ${sobrenome.trim()}`, // Junta Nome + Sobrenome
        email: email,
        senhaHash: senha, // Campo correto conforme seu Java
        role: getRoleEnum(roleVisual)
      };

      console.log("Payload enviado:", payload);

      // 3. Envio para a API (Porta 8082)
      const response = await fetch('http://localhost:8082/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      console.log("Status da resposta:", response.status);

      if (response.ok) {
        setMensagem({ tipo: 'sucesso', texto: 'Usuário cadastrado com sucesso!' });
        // Limpar campos
        setNome("");
        setSobrenome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        setRoleVisual("Usuário Comum");
      } else {
        // --- PARTE IMPORTANTE: Captura o erro exato do backend ---
        const erroTexto = await response.text();
        console.error("Erro detalhado do backend:", erroTexto);
        
        // MOSTRA UM ALERTA NA TELA COM O ERRO EXATO
        alert(`Erro ${response.status}: ${erroTexto}`);
        
        setMensagem({ tipo: 'erro', texto: erroTexto || `Erro ${response.status} ao cadastrar.` });
      }

    } catch (error) {
      console.error(error);
      alert("Erro de Conexão: Verifique se o Backend está rodando na porta 8082.");
      setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleCadastro}>
        <h2 className={styles.cardTitle}>Cadastro de Usuário</h2>

        {/* Mensagens de Feedback */}
        {mensagem.texto && (
          <div style={{ 
            padding: '12px', 
            marginBottom: '20px', 
            borderRadius: '8px', 
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: '500',
            backgroundColor: mensagem.tipo === 'erro' ? '#fee2e2' : '#dcfce7',
            color: mensagem.tipo === 'erro' ? '#b91c1c' : '#15803d',
            border: `1px solid ${mensagem.tipo === 'erro' ? '#fecaca' : '#bbf7d0'}`
          }}>
            {mensagem.texto}
          </div>
        )}

        {/* Nome */}
        <label className={styles.label}>Nome*</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        {/* Sobrenome */}
        <label className={styles.label}>Sobrenome*</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Digite o sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />

        {/* E-mail */}
        <label className={styles.label}>E-mail*</label>
        <input
          type="email"
          className={styles.input}
          placeholder="Digite o e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Select de Perfil */}
        <label className={styles.label}>Tipo de Perfil*</label>
        <div className={styles.inputWrapper}>
          <select 
            className={styles.inputWithIcon}
            value={roleVisual}
            onChange={(e) => setRoleVisual(e.target.value)}
          >
            <option>Usuário Comum</option>
            <option>Administrador</option>
            <option>Master</option>
          </select>
        </div>

        {/* Senha */}
        <label className={styles.label}>Senha*</label>
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            className={styles.inputWithIcon}
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.iconButton}
          >
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        {/* Confirmar Senha */}
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

        <button 
          type="submit" 
          className={styles.submitButton} 
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar Usuário'}
        </button>
      </form>
    </div>
  );
}