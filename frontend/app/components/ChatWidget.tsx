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

export function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className={chat.chatContainer}>
      {isChatOpen && (
        <div className={chat.chatWindow}>
          <div className={chat.chatHeader}>
            <IconBot />
            <span>Assistente</span>
            <button
              className={chat.closeButton}
              onClick={() => setIsChatOpen(false)}
            >
              X
            </button>
          </div>

          <div className={chat.chatBody}>
            <div className={chat.botMessage}>
              Boa tarde! Sou seu assistente. Posso tirar dúvidas e mostrar
              links e site.
            </div>
          </div>

          <div className={chat.chatInputArea}>
            <input
              type="text"
              placeholder="Pergunte algo..."
              className={chat.chatInput}
            />
            <button className={chat.sendButton}>Enviar</button>
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