import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";
import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const token = "enter your access token here";
  const { id } = event.pathParameters;
  const response = await axios.get(
    `https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365184650450/account/${id}?minorversion=62`,

    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return formatJSONResponse({
    account: response.data,
  });
};

export const main = middyfy(hello);
