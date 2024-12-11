import { handler } from "./index"; // Import handler from index.ts
import { APIGatewayProxyEvent, Context } from "aws-lambda";

describe("Lambda Function Tests", () => {
  it('should return "Hello, World" if no name is provided', async () => {
    const event: APIGatewayProxyEvent = {
      queryStringParameters: null, // No query parameters
      body: null,
      headers: {},
      httpMethod: "GET",
      isBase64Encoded: false,
      path: "/hello",
      pathParameters: null,
      stageVariables: null,
      requestContext: {} as any,
    } as any;

    // Mock the context (you can mock any necessary properties here)
    const context: Context = {} as Context;

    // Mock the callback as a no-op function
    const callback = jest.fn();

    await handler(event, context, callback);

    // Verify the callback was invoked with the expected response
    expect(callback).toHaveBeenCalledWith(null, {
      statusCode: 200,
      body: JSON.stringify("Hello, World!"),
    });
  });

  it('should return "Hello, [name]" if a name is provided', async () => {
    const event: APIGatewayProxyEvent = {
      queryStringParameters: { name: "John" }, // Name provided
      body: null,
      headers: {},
      httpMethod: "GET",
      isBase64Encoded: false,
      path: "/hello",
      pathParameters: null,
      stageVariables: null,
      requestContext: {} as any,
    } as any;

    const context: Context = {} as Context;

    // Mock the callback as a no-op function
    const callback = jest.fn();

    // Call the handler with event, context, and the callback
    await handler(event, context, callback);

    // Verify the callback was invoked with the expected response
    expect(callback).toHaveBeenCalledWith(null, {
      statusCode: 200,
      body: JSON.stringify("Hello, John!"),
    });
  });
});
