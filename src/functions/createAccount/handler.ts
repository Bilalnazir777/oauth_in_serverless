import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import axios from "axios";
// import { url } from "inspector";
// import { config } from "process";
const createAccount: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { Name } = event.body;
  const { AccountType } = event.body;
  const token = "enter your access token here";
  const Data = {
    Name,
    AccountType,
  };
  console.log(Data);
  const response = await axios.post(
    "https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365184650450/account?minorversion=62",
    Data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(response);

  return formatJSONResponse({
    Response: response.data,
  });
};

export const main = middyfy(createAccount);
