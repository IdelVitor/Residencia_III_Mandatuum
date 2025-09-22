// frontend/app/login/page.tsx
import styles from "./login.module.css";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className={styles.bg}>
      <div className={styles.brand}>Mandatuum</div>

      <section className={styles.card}>
        <h1 className={styles.title}>Login</h1>

        <form className={styles.form}>
          <label className={styles.label} htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            placeholder="voce@email.com"
            required
          />

          <label className={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles.input}
            placeholder="••••••••"
            required
          />

          <div className={styles.checkboxRow}>
            <input id="remember" name="remember" type="checkbox" />
            <label htmlFor="remember">Lembrar-me</label>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.button}>Entrar</button>
          </div>
        </form>
      </section>
    </div>
  );
}
