import { z } from "zod";

export const layerZeroWalletMessagesSchema = z.object({
  data: z.array(
    z.object({
      status: z.object({
        name: z.enum(
          [
            "INFLIGHT",
            "DELIVERED",
            "FAILED",
            "UNRESOLVABLE_COMMAND",
            "MALFORMED_COMMAND",
          ],
          { message: "Invalid message status" }
        ),
      }),
      pathway: z.object({
        nonce: z.number(),
        id: z.string(),
      }),
      source: z.object({
        tx: z.object({
          txHash: z.string(),
          from: z.string(),
        }),
      }),
      destination: z.object({
        tx: z
          .object({
            txHash: z.string(),
          })
          .optional(),
      }),
      created: z.string(),
    })
  ),
  nextToken: z.string().optional(),
});
