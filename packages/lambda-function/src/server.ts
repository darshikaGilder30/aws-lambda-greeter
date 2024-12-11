import express, { Request, Response, RequestHandler } from "express";
import { query, validationResult } from "express-validator";

const app = express();

// Function to generate greeting
const generateGreeting = (name?: string): string => {
  return `Hello, ${name || "World"}`; // If 'name' is not provided, it defaults to "World"
};

// Route with express-validator for 'name' query parameter validation
const helloHandler: RequestHandler = (req: Request, res: Response): void => {
  // Get validation results
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If validation fails, return 400 with the error messages
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const name = req.query.name as string | undefined;

  // If no name provided, default to "World"
  const responseMessage = generateGreeting(name);
  res.status(200).send(responseMessage);
};

app.get(
  "/hello",
  // Validate 'name' query parameter using express-validator
  query("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces")
    .trim(),

  helloHandler // Use the handler function
);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
