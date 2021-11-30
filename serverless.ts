import type { AWS } from "@serverless/typescript";

// import hello from "@functions/hello";

import authorizeuri from "@functions/authorizeuri";
import dynamosaving from "@functions/dynamo";
import retrive from "@functions/retievetoken";
import createAccount from "@functions/createAccount";
import readAccount from "@functions/readAccount";
import queryaccount from "@functions/queryaccount";
import updateaccount from "@functions/updateaccount";

const serverlessConfiguration: AWS = {
  service: "quickbook-oauth-in-serverless",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        migrate: true,
        seed: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  resources: {
    Resources: {
      TypesciptTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "TypescriptTable",
          AttributeDefinitions: [
            { AttributeName: "authCode", AttributeType: "S" },
          ],
          KeySchema: [{ AttributeName: "authCode", KeyType: "HASH" }],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
  // import the function via paths
  functions: {
    dynamosaving,
    authorizeuri,
    retrive,
    createAccount,
    readAccount,
    queryaccount,
    updateaccount,
  },
};

module.exports = serverlessConfiguration;
