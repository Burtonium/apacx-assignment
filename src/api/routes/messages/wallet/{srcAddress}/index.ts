import { API_DEFAULT_PAGE_SIZE } from "@/config";
import { layerZeroWalletMessagesSchema } from "./schema";

const DEFAULTS = {
  limit: API_DEFAULT_PAGE_SIZE,
};

export const getWalletMessages = async (
  srcAddress: string,
  params?: {
    limit?: number;
    nextToken?: string;
  }
) => {
  const { limit = DEFAULTS.limit, nextToken } = params ?? {};
  const response = await fetch(
    `https://scan.layerzero-api.com/v1/messages/wallet/${srcAddress}?limit=${limit}&nextToken=${nextToken}`
  );
  const data = await response.json();
  return layerZeroWalletMessagesSchema.parse(data);
};
