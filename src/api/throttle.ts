import { API_RATE_LIMIT } from "@/config";

let lastCall = 0;

export const throttle = <Args extends unknown[], Return>(
  apiCall: (...args: Args) => Promise<Return>
) => {
  return async function (...args: Args) {
    const now = Date.now();
    if (now - lastCall < API_RATE_LIMIT) {
      await new Promise((resolve) =>
        setTimeout(resolve, API_RATE_LIMIT - (now - lastCall))
      );
    }
    lastCall = Date.now();
    return apiCall(...args);
  };
};
