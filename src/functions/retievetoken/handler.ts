import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
// import OAuthClient from "intuit-oauth";
import { OAuthClient, oauth } from "@functions/oauth_instance";
import schema from "./schema";

const retrieveToken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  // var oauth = new OAuthClient();

  oauth.createToken(event.path).then(function (authResponse) {
    const oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
    // return formatJSONResponse({
    //   message: "token created",
    //   body: oauth2_token_json,
    // });
  });

  return formatJSONResponse({
    message: "token NOT created",
  });
};

export const main = middyfy(retrieveToken);
