let lastCall = 0;
const RATE_LIMIT = 1000;

export const throttle = <Args extends unknown[], Return>(
  apiCall: (...args: Args) => Promise<Return>
) => {
  return async function (...args: Args) {
    const now = Date.now();
    if (now - lastCall < RATE_LIMIT) {
      await new Promise((resolve) =>
        setTimeout(resolve, RATE_LIMIT - (now - lastCall))
      );
    }
    lastCall = Date.now();
    return apiCall(...args);
  };
};
