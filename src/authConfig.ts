import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "b42d016c-c69f-4a71-bf7c-a9e6a96e37ee",
        authority: "https://hardcor.b2clogin.com/hardcor.onmicrosoft.com/SocialAndLocalAccounts/oauth2/v2.0/authorize",
        redirectUri: "http://localhost:3000",
        postLogoutRedirectUri: "http://localhost:3000"
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ["User.Read"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};