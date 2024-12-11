import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define a single Lambda function for both `/hello` and `/api-docs`
    const CombinedRouteHandlerFunction = new lambda.Function(
      this,
      "CombinedRouteHandler",
      {
        runtime: lambda.Runtime.NODEJS_22_X,
        code: lambda.Code.fromAsset("../lambda-function/dist"), // Path to Lambda code
        handler: "index.handler", // Lambda function entry point
        functionName: "CombinedRouteHandler",
        description: "Lambda function to handle both hello and api-docs routes",
      }
    );

    // Define main API Gateway
    const MultiServiceApi = new apigateway.RestApi(this, "MultiServiceApi", {
      restApiName: "Multi ServiceApi API",
      deployOptions: {
        stageName: "prod",
      },
    });

    // Add the `/hello` endpoint and point it to the Lambda function
    const helloResource = MultiServiceApi.root.addResource("hello");
    helloResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(CombinedRouteHandlerFunction)
    );

    // Add the `/swagger.json` endpoint and point it to the Lambda function
    const swaggerJsonResource =
      MultiServiceApi.root.addResource("swagger.json");
    swaggerJsonResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(CombinedRouteHandlerFunction)
    );

    // Add the `/api-docs` endpoint and point it to the same Lambda function
    const apiDocsResource = MultiServiceApi.root.addResource("api-docs");
    apiDocsResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(CombinedRouteHandlerFunction)
    );
  }
}
