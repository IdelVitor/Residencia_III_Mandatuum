// frontend/app/login/page.tsx
export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Entrar</h1>

        <label className="block">
          <span className="text-sm">E-mail</span>
          <input
            type="email"
            required
            className="mt-1 w-full rounded border p-2"
            placeholder="voce@email.com"
          />
        </label>

        <label className="block">
          <span className="text-sm">Senha</span>
          <input
            type="password"
            required
            className="mt-1 w-full rounded border p-2"
            placeholder="••••••••"
          />
        </label>

        <button type="submit" className="w-full rounded bg-black p-2 text-white">
          Entrar
        </button>
      </form>
    </main>
  );
}
