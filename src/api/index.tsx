import { getWalletMessages } from "./routes/messages/wallet/{srcAddress}";
import { throttle } from "./throttle";

export type * from "./types";

export default {
  getMessages: throttle(getWalletMessages),
};
