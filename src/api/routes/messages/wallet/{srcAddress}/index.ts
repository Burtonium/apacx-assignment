import { layerZeroWalletMessagesSchema } from "./schema";

export const getWalletMessages = async (srcAddress: string) => {
  const response = await fetch(
    `https://scan.layerzero-api.com/v1/messages/wallet/${srcAddress}`
  );
  const data = await response.json();
  return layerZeroWalletMessagesSchema.parse(data);
};
