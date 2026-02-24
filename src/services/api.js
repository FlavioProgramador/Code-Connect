/**
 * Simples wrapper em volta do fetch nativo para manter a compatibilidade
 * com as chamadas api.post e api.get já existentes nos formulários,
 * sem precisar instalar bibliotecas pesadas como Axios.
 */
const api = {
  get: async (url) => {
    const res = await fetch(`/api${url}`);
    if (!res.ok) throw new Error("Erro na requisição");
    const json = await res.json();
    return { data: json };
  },
  post: async (url, body) => {
    const res = await fetch(`/api${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Erro na requisição");
    const json = await res.json();
    return { data: json };
  }
};

export default api;
