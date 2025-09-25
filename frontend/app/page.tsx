// frontend/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); // sempre redireciona para o login estilizado
}
