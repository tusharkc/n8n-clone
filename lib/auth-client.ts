import { checkout, polar, portal, usage } from "@polar-sh/better-auth";
import { createAuthClient } from "better-auth/react";
import { polarClient } from "./polar";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "30265782-f9c1-423d-968f-d9ee67d2dbf6",
              slug: "n8n-clone-pro", // Custom slug for easy reference in Checkout URL, e.g. /checkout/n8n-clone-pro
            },
          ],
          successUrl: "/",
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
      ],
    }),
  ],
});
