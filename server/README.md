# Crypto Lead Server

A Node.js + TypeScript server with MongoDB integration and WebSocket support for the Crypto Lead application.

## Features

- Express.js server with TypeScript
- MongoDB database integration
- WebSocket support for real-time communication
- User management (CRUD operations)
- Input validation
- Rate limiting
- Security headers (Helmet)
- CORS configuration
- Logging system
- Environment variable configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/crypto-lead
   NODE_ENV=development
   JWT_SECRET=your-secret-key
   CORS_ORIGIN=http://localhost:3000
   ```

## Development

To run the server in development mode with hot reloading:

```bash
npm run dev
```

## Production

To build and run the server in production mode:

```bash
npm run build
npm start
```

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### WebSocket Events

- `message` - Send and receive messages

## Project Structure

```
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── index.ts        # Server entry point
├── .env                # Environment variables
├── package.json        # Project dependencies
└── tsconfig.json       # TypeScript configuration
```

## Security

- All routes are protected with rate limiting
- Input validation is implemented using Joi
- Security headers are set using Helmet
- CORS is configured to allow specific origins
- Passwords are hashed before storage

## Logging

The application uses Winston for logging. Logs are written to:
- Console (development)
- `error.log` (error messages)
- `combined.log` (all messages)

## Testing

To run tests:

```bash
npm test
```

## License

MIT 