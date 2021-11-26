import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
// import OAuthClient from "intuit-oauth";
import { oauth } from "@functions/oauth_instance";
import schema from "./schema";

const createtoken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log("############", event);
  const authCode = event.queryStringParameters.code;

  const path = event.path;

  const realmId = event.queryStringParameters.realmId;

  const state = event.queryStringParameters.state;

  const redirectUri = `/${path}?code=${authCode}&state=${state}&realmId=${realmId}`;

  oauth
    .createToken(redirectUri)
    .then(function (authResponse) {
      console.log("The Token is  " + JSON.stringify(authResponse.getJson()));
    })
    .catch(function (e) {
      console.error("The error message is :" + e.originalMessage);
      console.error(e.intuit_tid);
    });

  return formatJSONResponse({
    message: "token created",
    body: {},
  });

  // var oauth = new OAuthClient();
  // oauth.createToken()
  // oauth.createToken(event.path).then(function (authResponse) {
  //   const oauth2_token_json2 = JSON.stringify(authResponse.getJson(), null, 2);
  //   console.log(oauth2_token_json2);
  // saveOuth(oauth2_token_json2);
  // return formatJSONResponse({
  //   message: "token created",
  //   body: oauth2_token_json,
  // });
  // });
};

export const main = middyfy(createtoken);
