import { layerZeroWalletMessagesSchema } from "./routes/messages/wallet/{srcAddress}/schema";
import { z } from "zod";

export type WalletMessagesResponse = z.infer<
  typeof layerZeroWalletMessagesSchema
>;

export type WalletMessage = WalletMessagesResponse["data"][number];
