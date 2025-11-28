// JavaScript Example - Using badword-validator in a Node.js JavaScript project
import { BadWordFilter } from 'badword-validator';

// Basic usage example
const filter = new BadWordFilter();

console.log('=== Basic JavaScript Usage ===');

// Test sanitization
const dirtyText = "What the hell are you doing?";
const cleanText = filter.sanitize(dirtyText);
console.log('Original:', dirtyText);
console.log('Sanitized:', cleanText);

// Test validation
const validationResult = filter.validate(dirtyText);
console.log('Validation result:', validationResult);

console.log('\n=== Adding Custom Words ===');

// Add custom plugin with additional words
filter.use({
  name: 'CustomPlugin',
  words: {
    medium: ['dumb', 'stupid'],
    high: ['idiot']
  }
});

const customText = "Don't be such a dumb idiot.";
const customClean = filter.sanitize(customText);
console.log('Original:', customText);
console.log('Sanitized:', customClean);

console.log('\n=== Express.js Middleware Example ===');

// Example middleware function for Express.js
function createBadWordMiddleware() {
  const filter = new BadWordFilter();

  return (req, res, next) => {
    // Sanitize request body if it exists
    if (req.body) {
      if (typeof req.body === 'string') {
        req.body = filter.sanitize(req.body);
      } else if (typeof req.body === 'object') {
        // Recursively sanitize object properties
        function sanitizeObject(obj) {
          for (const key in obj) {
            if (typeof obj[key] === 'string') {
              obj[key] = filter.sanitize(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              sanitizeObject(obj[key]);
            }
          }
        }
        sanitizeObject(req.body);
      }
    }
    next();
  };
}

// Example usage
const middleware = createBadWordMiddleware();
console.log('Middleware created successfully!');

// Simulate middleware usage
const mockReq = {
  body: {
    message: "This is a damn good example!",
    title: "Hell yeah!"
  }
};

const mockRes = {};
const mockNext = () => console.log('Next function called');

middleware(mockReq, mockRes, mockNext);
console.log('Processed request body:', mockReq.body);