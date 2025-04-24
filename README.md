# Crypto Transfer Platform

A modern web application for cryptocurrency transfers and conversions, built with Next.js and TypeScript.

## Features

- **Live Crypto Rates**: Real-time cryptocurrency price tracking and charts
- **Crypto Conversion**: Easy conversion between different cryptocurrencies
- **User-Friendly Interface**: Modern, responsive design with intuitive navigation
- **Real-time Updates**: Live price updates and market data
- **Secure Transactions**: Safe and secure crypto transfer process

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React Query
- WebSocket for real-time updates

### Backend
- Node.js
- Express
- MongoDB
- WebSocket
- TypeScript

## Project Structure

```
.
├── client/                 # Frontend application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── providers/     # Context providers
│   │   ├── data/          # Static data
│   │   └── types/         # TypeScript type definitions
│   └── public/            # Static assets
│
└── server/                # Backend application
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── controllers/   # Route controllers
    │   ├── middleware/    # Custom middleware
    │   ├── models/        # MongoDB models
    │   ├── routes/        # API routes
    │   └── utils/         # Utility functions
    └── .env               # Environment variables
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables:
   - Create `.env` file in the server directory (see server/README.md for details)
   - Create `.env.local` file in the client directory if needed

4. Start the development servers:
   ```bash
   # Start the client (from client directory)
   npm run dev

   # Start the server (from server directory)
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Features Documentation

### Live Crypto Rates
- Real-time price updates for major cryptocurrencies
- Interactive price charts
- Top 5 cryptocurrencies display
- Detailed crypto table with sorting and filtering

### Crypto Conversion
- Convert between different cryptocurrencies
- Real-time conversion rates
- Historical price data
- Transaction history

### User Interface
- Responsive design for all devices
- Dark mode theme
- Intuitive navigation
- Loading states and error handling

## API Documentation

### Crypto Data Endpoints
- `GET /api/crypto/rates` - Get current crypto rates
- `GET /api/crypto/history` - Get historical price data
- `GET /api/crypto/convert` - Convert between cryptocurrencies

### User Endpoints
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user information

## Development

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages

### Testing
```bash
# Run client tests
cd client
npm test

# Run server tests
cd server
npm test
```

## Deployment

### Client
The client can be deployed to Vercel:
```bash
# Build the client
cd client
npm run build

# Deploy to Vercel
vercel
```

### Server
The server can be deployed to any Node.js hosting platform:
```bash
# Build the server
cd server
npm run build

# Start the server
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team. 