const getApiBase = () => {
  if (process.env.NEXT_PUBLIC_API_BASE) return process.env.NEXT_PUBLIC_API_BASE;
  return "https://api.coinage.media";
};

export const postApi = async (path: string, body: Record<string, any>) => {
  return await fetch(`${getApiBase()}/${path}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body)
  });
};

export const getApi = async (path: string) => {
  return await fetch(`${getApiBase()}/${path}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET"
  });
};

export const putApi = async (path: string, body: Record<string, any>) => {
  return await fetch(`${getApiBase()}/${path}`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(body)
  });
};

export default getApiBase();
