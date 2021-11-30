import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";
import schema from "./schema";

const queryaccount: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const token = "enter your access token here";

  const response = await axios.get(
    "https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365184650450/query?query=select * from Account where Metadata.CreateTime > '2014-12-31'&minorversion=62",

    { headers: { Authorization: `Bearer ${token}` } }
  );

  return formatJSONResponse({
    queryresponse: response.data,
  });
};

export const main = middyfy(queryaccount);
