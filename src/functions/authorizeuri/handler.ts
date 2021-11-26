import { middyfy } from "@libs/lambda";
import { OAuthClient, oauth } from "@functions/oauth_instance";
import { Handler } from "aws-lambda";

const authorizeuri: Handler = async (event, context, callback) => {
  const authUri = oauth.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: "intuit-test",
  });

  const response = {
    statusCode: 301,

    headers: {
      Location: authUri,
    },
  };

  console.log(response);

  return callback(null, response);
};

export const main = middyfy(authorizeuri);
