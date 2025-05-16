import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true, // Simplified email configuration for now
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
        scopes: ["email", "profile", "openid"],
      },
      // facebook: { // User has this commented out
      //   clientId: secret("FACEBOOK_APP_ID"),
      //   clientSecret: secret("FACEBOOK_APP_SECRET"),
      //   scopes: ["public_profile", "email"],
      // },
      callbackUrls: [
        "http://localhost:3000/amplify/auth/complete-external-sign-in",
        // TODO: Add your deployed application's callback URL here
      ],
      logoutUrls: [
        "http://localhost:3000/",
        // TODO: Add your deployed application's base URL here for logout
      ],
    },
  },
  // You can re-add more complex email config, MFA, userAttributes etc. once this core structure is error-free
});
