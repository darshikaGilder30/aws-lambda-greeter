"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index"); // Import handler from index.ts
describe("Lambda Function Tests", () => {
    it('should return "Hello, World" if no name is provided', async () => {
        const event = {
            queryStringParameters: null, // No query parameters
            body: null,
            headers: {},
            httpMethod: "GET",
            isBase64Encoded: false,
            path: "/hello",
            pathParameters: null,
            stageVariables: null,
            requestContext: {},
        };
        // Mock the context (you can mock any necessary properties here)
        const context = {};
        // Mock the callback as a no-op function
        const callback = jest.fn();
        await (0, index_1.handler)(event, context, callback);
        // Verify the callback was invoked with the expected response
        expect(callback).toHaveBeenCalledWith(null, {
            statusCode: 200,
            body: JSON.stringify("Hello, World!"),
        });
    });
    it('should return "Hello, [name]" if a name is provided', async () => {
        const event = {
            queryStringParameters: { name: "John" }, // Name provided
            body: null,
            headers: {},
            httpMethod: "GET",
            isBase64Encoded: false,
            path: "/hello",
            pathParameters: null,
            stageVariables: null,
            requestContext: {},
        };
        const context = {};
        // Mock the callback as a no-op function
        const callback = jest.fn();
        // Call the handler with event, context, and the callback
        await (0, index_1.handler)(event, context, callback);
        // Verify the callback was invoked with the expected response
        expect(callback).toHaveBeenCalledWith(null, {
            statusCode: 200,
            body: JSON.stringify("Hello, John!"),
        });
    });
});
