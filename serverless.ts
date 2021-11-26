import type { AWS } from "@serverless/typescript";

// import hello from "@functions/hello";
import createoken from "@functions/createoken";
import authorizeuri from "@functions/authorizeuri";
import retrieveToken from "@functions/retievetoken";

const serverlessConfiguration: AWS = {
  service: "quickbook-oauth-in-serverless",
  frameworkVersion: "2",
  custom: {
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
  plugins: ["serverless-esbuild", "serverless-offline"],
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
  // import the function via paths
  functions: { createoken, authorizeuri, retrieveToken },
};

module.exports = serverlessConfiguration;
