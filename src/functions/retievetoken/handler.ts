import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import * as AWS from "aws-sdk";
import { oauth } from "@functions/oauth_instance";
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
});

export const retrive: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    // const { realmId } = event.queryStringParameters;
    const Item = await dynamodb
      .scan({
        TableName: "TypescriptTable",
      })
      .promise();
    const redirectUri = `/savingdtaa?code=${Item.Items[0].authCode}&state=${Item.Items[0].state}&realmId=${Item.Items[0].realmId}`;
    const result = await oauth.createToken(redirectUri);
    const token = result.getJson();

    return formatJSONResponse({
      message: "token created",
      token: token,
    });
  };

export const main = middyfy(retrive);
