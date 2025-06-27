// Utilitário central para requisições à API da casa de apostas
// Troque BASE_URL pela URL da API do seu cliente

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function apiGet(endpoint: string, token?: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Erro ao buscar dados da API");
  return res.json();
}

export async function apiPost(endpoint: string, data: any, token?: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao enviar dados para a API");
  return res.json();
}

// Exemplo de uso:
// const jogadores = await apiGet('/jogadores', token);
// await apiPost('/campanhas', novaCampanha, token); 