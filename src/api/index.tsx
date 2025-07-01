import { getWalletMessages } from "./routes/messages/wallet/{srcAddress}";
import { throttle } from "./throttle";

export default {
  getMessages: throttle(getWalletMessages),
};
