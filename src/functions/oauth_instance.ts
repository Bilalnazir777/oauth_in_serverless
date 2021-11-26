import OAuthClient from "intuit-oauth";
const oauth = new OAuthClient({
  clientId: "AB9K7iPiIbJjTbfZA03qqnrKgXPGWRFOVHjYFW7a70MF3SHoAG",
  clientSecret: "YD9F7nhfwKJtFXPgZVnYznSSRjhG7vQEvh5Nateq",
  environment: "sandbox",
  redirectUri: "http://localhost:3000/dev/savingdtaa",
});
export { OAuthClient, oauth };
