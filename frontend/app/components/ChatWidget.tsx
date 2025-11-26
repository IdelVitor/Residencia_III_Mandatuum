"use client";

import { useState } from "react";
import chat from "./chat.module.css";

const IconBot = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V12C22 6.48 17.52 2 12 2ZM12 4C16.41 4 20 7.59 20 12V19H4V12C4 7.59 7.59 4 12 4ZM8.5 11C7.67 11 7 11.67 7 12.5C7 13.33 7.67 14 8.5 14C9.33 14 10 13.33 10 12.5C10 11.67 9.33 11 8.5 11ZM15.5 11C14.67 11 14 11.67 14 12.5C14 13.33 14.67 14 15.5 14C16.33 14 17 13.33 17 12.5C17 11.67 16.33 11 15.5 11Z"
      fill="currentColor"
    />
  </svg>
);

type Message = {
  id: number;
  type: "bot" | "user";
  text: string;
};

export function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Olá! Sou o assistente do SEDEM. Como posso ajudar com os dados financeiros hoje?",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now(), type: "user", text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";
      const token = localStorage.getItem("token");

      const res = await fetch(`${base}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ pergunta: userMsg.text }),
      });

      if (!res.ok) {
        throw new Error("Erro na comunicação com a IA");
      }

      const data = await res.json();

      const botMsg: Message = {
        id: Date.now() + 1,
        type: "bot",
        text: data.resposta,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: Date.now() + 1,
        type: "bot",
        text: "Desculpe, ocorreu um erro ao processar sua pergunta.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={chat.chatContainer}>
      {isChatOpen && (
        <div className={chat.chatWindow}>
          <div className={chat.chatHeader}>
            <IconBot />
            <span>Assistente IA</span>
            <button
              className={chat.closeButton}
              onClick={() => setIsChatOpen(false)}
            >
              X
            </button>
          </div>

          <div className={chat.chatBody}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.type === "bot" ? chat.botMessage : chat.userMessage
                }
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className={chat.loadingMessage}>Digitando...</div>
            )}
          </div>

          <div className={chat.chatInputArea}>
            <input
              type="text"
              placeholder="Pergunte sobre o financeiro..."
              className={chat.chatInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className={chat.sendButton}
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? "..." : "Enviar"}
            </button>
          </div>
        </div>
      )}

      <button
        className={chat.chatToggleButton}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <IconBot />
      </button>
    </div>
  );
}
