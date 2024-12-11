"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const generateGreeting = (name) => {
    return `Hello, ${name || "World"}`;
};
const isValidName = (name) => {
    // Validate that name is a string and contains only letters and spaces
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
};
const handler = async (event, context, callback) => {
    // Swagger definition
    const swaggerDocument = {
        openapi: "3.0.0",
        info: {
            title: "Greet API",
            version: "1.0.0",
            description: "A simple API to greet users",
        },
        servers: [
            {
                url: `https://${event.requestContext.domainName}/prod`,
                description: "Production Server",
            },
        ],
        paths: {
            "/hello": {
                get: {
                    summary: "Greet the user",
                    parameters: [
                        {
                            name: "name",
                            in: "query",
                            required: false,
                            description: "Name to greet",
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful Response",
                            content: {
                                "application/json": {
                                    example: { message: "Hello, World!" },
                                },
                            },
                        },
                    },
                },
            },
        },
    };
    const pathRequested = event.path; // Get the requested path
    if (pathRequested === "/hello") {
        // Get the 'name' query parameter
        const name = event.queryStringParameters?.name || "World";
        // Validate the 'name' parameter
        if (name !== "World" && !isValidName(name)) {
            const errorResponse = {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Name must be a string and only contain letters and spaces",
                }),
            };
            callback(null, errorResponse);
            return;
        }
        // Generate the greeting message
        const response = {
            statusCode: 200,
            body: JSON.stringify(generateGreeting(name)),
        };
        callback(null, response);
    }
    else if (pathRequested === "/api-docs") {
        // Serve the Swagger UI HTML using the Swagger UI CDN
        try {
            // HTML structure for Swagger UI from CDN
            let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>API Documentation</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.52.5/swagger-ui.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.52.5/swagger-ui-bundle.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.52.5/swagger-ui-standalone-preset.js"></script>
          <script>
            const ui = SwaggerUIBundle({
              url: "https://${event.requestContext.domainName}/prod/swagger.json", // Link to the Swagger JSON definition
              dom_id: "#swagger-ui",
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
              ],
              layout: "BaseLayout"
            });
          </script>
        </body>
        </html>
      `;
            // Send the HTML response
            const response = {
                statusCode: 200,
                headers: {
                    "Content-Type": "text/html", // Serve as HTML
                },
                body: htmlContent,
            };
            callback(null, response);
        }
        catch (error) {
            console.error("Error serving Swagger UI:", error);
            const response = {
                statusCode: 500,
                body: "Failed to load Swagger UI",
            };
            callback(null, response);
        }
    }
    else if (pathRequested === "/swagger.json") {
        // Serve the Swagger/OpenAPI JSON definition
        const response = {
            statusCode: 200,
            body: JSON.stringify(swaggerDocument), // Return the Swagger JSON
            headers: {
                "Content-Type": "application/json", // Serve as Swagger JSON
            },
        };
        callback(null, response);
    }
    else {
        // Handle unknown paths with 404
        const response = {
            statusCode: 404,
            body: "Not Found",
        };
        callback(null, response);
    }
};
exports.handler = handler;
