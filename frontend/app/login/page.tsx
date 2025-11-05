"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senhaHash: senha }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Falha no login");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", String(data.userId));
      localStorage.setItem("role", String(data.role));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    }
  };

  console.log(
      "Minha API URL:",
      process.env.NEXT_PUBLIC_API_URL
    );

  return (
      <div className={styles.bg}>
        <div className={styles.brand}>Mandatuum</div>
        <section className={styles.card}>
          <h1 className={styles.title}>Login</h1>

          <form className={styles.form} onSubmit={handleLogin}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
            />

            <div className={styles.checkboxRow}>
              <input id="remember" name="remember" type="checkbox" />
              <label htmlFor="remember">Lembrar-me</label>
            </div>

            {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}

            <div className={styles.actions}>
              <button type="submit" className={styles.button}>
                Entrar
              </button>
            </div>
          </form>
        </section>
      </div>
  );
}
