import { postApi } from "./getApiBase";

export const addEmail = async (
  email: string,
  subscribeLocation: string,
  walletAddress?: string
) => {
  const data = await postApi("subscribe", {
    email,
    subscribeLocation,
    walletAddress
  });

  return data.json();
};
