"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const app = (0, express_1.default)();
// Function to generate greeting
const generateGreeting = (name) => {
    return `Hello, ${name || "World"}`; // If 'name' is not provided, it defaults to "World"
};
// Route with express-validator for 'name' query parameter validation
const helloHandler = (req, res) => {
    // Get validation results
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // If validation fails, return 400 with the error messages
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const name = req.query.name;
    // If no name provided, default to "World"
    const responseMessage = generateGreeting(name);
    res.status(200).send(responseMessage);
};
app.get("/hello", 
// Validate 'name' query parameter using express-validator
(0, express_validator_1.query)("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces")
    .trim(), helloHandler // Use the handler function
);
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
