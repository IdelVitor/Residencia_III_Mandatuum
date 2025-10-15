export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
    }
    return res.json();
}
