## E-commerce Store Backend

This is a Node.js Express server implemented in TypeScript, providing a simple e-commerce backend API. Clients can add items to their cart, checkout to place orders, and every nth order generates a discount code for a 10% discount applicable to their entire cart. The server uses an in-memory data store and is structured with separate routes for cart and admin functionalities.

### Assumptions made

1. Order Counting
   1. Nth order is counted based on overall order count, not user-specific orders.
2. Discount Coupons
   1. Automatic Generation
      1. Generated on the nth order for the specific user who placed the order.
      2. One-time validity.
   2. Admin-Generated
      1. Admins can create and distribute coupons.
      2. Can be common (for all users) or user-specific with one time validity.
3. Inventory
   1. Product quantity is assumed to be unlimited.

### Project Structure

- src
  - store/dataStore.ts: Contains in-memory data stores and shared interfaces.
  - routes/cart.route.ts: Contains cart-related routes.
  - routes/admin.route.ts: Contains admin-related routes.
  - controllers/admin.controller.ts: Contains business logic for admin endpoints;
  - controllers/cart.controller.ts: Contains business logic for cart endpoints;
  - server.ts: Initializes the Express app and mounts the route files.
  - utils
    - app.utils.ts: A Class for express provider
    - helpers.utils.ts: Common helper utility functions
  - middleware
    - roles.middleware.ts: Middleware for authentication(basic)
  - constants
    - config.constant.ts: config related constant that affects business logic of the entire app and setup constant if required.
  - package.json: Project dependencies and scripts.
  - tsconfig.json: TypeScript compiler configuration.
  - README.md: Project documentation.

### Requirements

- Node.js (version 20 or higher recommended)
- yarn/npm
- TypeScript (installed locally via npm)

### Installation

1. Clone the repository:

   `git clone https://github.com/Rupam-Shil/QuickCommerce.git  `

2. Navigate to the project directory:

   `cd quickcom-server  `

3. Install dependencies:

   `yarn`
   `npm install`

### Building and Running the Server

1. To run the code locally, run:
   ` yarn dev`
2. To build and start the server, run:
   `yarn build`
   `yarn start`

## Api Docs

Find the postman folder to get the dump of the postman collection and env variables
