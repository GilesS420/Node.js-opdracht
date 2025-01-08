# Achievement Tracker API

A Node.js API for tracking video game achievements. Users can manage games and their associated achievements.

## Features
- CRUD operations for games and achievements
- Search functionality for achievements
- Pagination for game listings
- Basic data validation
- Image upload support for games

## What you need
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm 

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/achievement-tracker.git](https://github.com/GilesS420/Node.js-opdracht.git
cd Nodejs-project
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


3. Access the application:
- Open `http://localhost:3000` in your browser Here you will find the API documentation click on games or achievments to see the functioning of the application


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


## Validation
- Required fields cannot be empty
- Release dates must be valid and not in the future
- Points must be numeric values
- Game titles must be unique
- Image uploads are limited to 5MB

## Known errors
- Images might not be visible

