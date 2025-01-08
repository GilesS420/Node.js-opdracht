# Achievement Tracker API

A Node.js API for tracking video game achievements. Users can manage games and their associated achievements.

## Features
- CRUD operations for games and achievements
- Search functionality for achievements
- Pagination for game listings
- Basic data validation
- Image upload support for games

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/achievement-tracker.git
cd achievement-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string with your credentials
```bash
cp .env.example .env
```

4. Set up MongoDB:
   - Create a MongoDB Atlas account (or use local MongoDB)
   - Create a new cluster
   - Get your connection string
   - Replace the placeholder in `.env` with your connection string

Example connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/database
```

5. Create required directories:
```bash
mkdir -p public/uploads/games
```

## Database Setup

1. Seed the database with sample data:
```bash
npm run seed
```

This will populate your database with:
- Sample games
- Sample achievements

## Running the Application

1. Start the server:
```bash
npm start
```

2. For development with auto-reload:
```bash
npm run dev
```

3. Access the application:
- Open `http://localhost:3000` in your browser
- API documentation available at `http://localhost:3000/api`

## API Endpoints

### Games
- `GET /api/games` - List all games (with pagination)
- `GET /api/games/:id` - Get game details
- `POST /games/new` - Create new game
- `PUT /games/:id` - Update game
- `DELETE /games/:id` - Delete game

### Achievements
- `GET /api/achievements` - List all achievements
- `GET /api/achievements/search` - Search achievements
- `POST /achievements/new` - Create new achievement
- `PUT /achievements/:id` - Update achievement
- `DELETE /achievements/:id` - Delete achievement

## Project Structure
```
src/
├── models/          # Database models
├── routes/          # Route handlers
├── views/           # EJS templates
├── seeders/         # Database seeders
└── server.js        # Main application file

public/
├── css/            # Stylesheets
└── uploads/        # Uploaded images
```

## Validation
- Required fields cannot be empty
- Release dates must be valid and not in the future
- Points must be numeric values
- Game titles must be unique
- Image uploads are limited to 5MB

## Error Handling
The API includes basic error handling for:
- Invalid MongoDB IDs
- Missing required fields
- Invalid data types
- File upload errors
- Database connection issues

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details