import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";
import schema from "./schema";

const updateaccount: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const data = event.body;
  const token = "enter your access token here";
  const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365184650450/account?minorversion=62`;
  const response: any = await axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return formatJSONResponse({
    updateaccount: response.data,
  });
};

export const main = middyfy(updateaccount);
