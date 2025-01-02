const mongoose = require('mongoose');
const Game = require('../models/Game');
const Achievement = require('../models/Achievement');   

mongoose.connect('mongodb+srv://sct:iS8HtDdXKHyfjahI@cluster0.mg20q.mongodb.net/project_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB Atlas successfully');
    return seedDatabase();
})
.then(() => {
    console.log('Database seeded successfully!');
    return mongoose.connection.close();
})
.catch((error) => {
    console.error('Error:', error);
    return mongoose.connection.close();
});

const games = [
    {
        title: "The Legend of Zelda: Breath of the Wild",
        platform: ["Nintendo Switch"],
        genre: "Action-Adventure",
        description: "Explore the vast kingdom of Hyrule",
        imageUrl: "/uploads/games/zelda.jpg",
        totalAchievements: 3
    },
    {
        title: "God of War",
        platform: ["PlayStation 5", "PlayStation 4"],
        genre: "Action-Adventure",
        description: "Journey through Norse mythology",
        imageUrl: "/uploads/games/god-of-war.jpg",
        totalAchievements: 2
    },
    {
        title: "Elden Ring",
        platform: ["PC", "PlayStation 5", "Xbox Series X/S"],
        genre: "Action RPG",
        description: "Explore the Lands Between",
        imageUrl: "/uploads/games/elden-ring.jpg",
        totalAchievements: 2
    },
    {
        title: "Red Dead Redemption 2",
        platform: ["PC", "PlayStation 4", "Xbox One"],
        genre: "Action-Adventure",
        description: "Epic tale of life in America's unforgiving heartland",
        imageUrl: "/uploads/games/rdr2.jpg",
        totalAchievements: 3
    },
    {
        title: "Cyberpunk 2077",
        platform: ["PC", "PlayStation 5", "Xbox Series X/S"],
        genre: "Action RPG",
        description: "Open-world adventure in Night City",
        imageUrl: "/uploads/games/cyberpunk.jpg",
        totalAchievements: 2
    },
    {
        title: "The Witcher 3: Wild Hunt",
        platform: ["PC", "PlayStation 5", "Xbox Series X/S"],
        genre: "Action RPG",
        description: "Monster hunting in a fantasy world",
        imageUrl: "/uploads/games/witcher3.jpg",
        totalAchievements: 3
    },
    {
        title: "Super Mario Odyssey",
        platform: ["Nintendo Switch"],
        genre: "Platformer",
        description: "3D platforming adventure",
        imageUrl: "/uploads/games/mario-odyssey.jpg",
        totalAchievements: 2
    },
    {
        title: "Horizon Zero Dawn",
        platform: ["PC", "PlayStation 4"],
        genre: "Action RPG",
        description: "Post-apocalyptic world with robotic creatures",
        imageUrl: "/uploads/games/horizon.jpg",
        totalAchievements: 2
    },
    {
        title: "Final Fantasy VII Remake",
        platform: ["PlayStation 5", "PlayStation 4"],
        genre: "RPG",
        description: "Reimagining of the classic RPG",
        imageUrl: "/uploads/games/ff7remake.jpg",
        totalAchievements: 3
    },
    {
        title: "Hades",
        platform: ["PC", "Nintendo Switch", "PlayStation 5"],
        genre: "Roguelike",
        description: "Battle out of the underworld",
        imageUrl: "/uploads/games/hades.jpg",
        totalAchievements: 2
    },
    {
        title: "Ghost of Tsushima",
        platform: ["PlayStation 5", "PlayStation 4"],
        genre: "Action-Adventure",
        description: "Samurai epic in feudal Japan",
        imageUrl: "/uploads/games/ghost.jpg",
        totalAchievements: 2
    },
    {
        title: "Persona 5 Royal",
        platform: ["PC", "PlayStation 5", "Nintendo Switch"],
        genre: "RPG",
        description: "Japanese RPG about phantom thieves",
        imageUrl: "/uploads/games/persona5.jpg",
        totalAchievements: 3
    },
    {
        title: "Hollow Knight",
        platform: ["PC", "Nintendo Switch", "PlayStation 4"],
        genre: "Metroidvania",
        description: "Adventure through a vast underground kingdom",
        imageUrl: "/uploads/games/hollow-knight.jpg",
        totalAchievements: 2
    },
    {
        title: "Death Stranding",
        platform: ["PC", "PlayStation 5"],
        genre: "Action",
        description: "Reconnect a fractured society",
        imageUrl: "/uploads/games/death-stranding.jpg",
        totalAchievements: 2
    },
    {
        title: "Sekiro: Shadows Die Twice",
        platform: ["PC", "PlayStation 4", "Xbox One"],
        genre: "Action-Adventure",
        description: "Shinobi adventure in feudal Japan",
        imageUrl: "/uploads/games/sekiro.jpg",
        totalAchievements: 3
    },
    {
        title: "Monster Hunter: World",
        platform: ["PC", "PlayStation 4", "Xbox One"],
        genre: "Action RPG",
        description: "Hunt massive creatures in a living ecosystem",
        imageUrl: "/uploads/games/monster-hunter.jpg",
        totalAchievements: 2
    },
    {
        title: "Disco Elysium",
        platform: ["PC", "PlayStation 5", "Nintendo Switch"],
        genre: "RPG",
        description: "Detective RPG in a unique world",
        imageUrl: "/uploads/games/disco-elysium.jpg",
        totalAchievements: 2
    },
    {
        title: "Stardew Valley",
        platform: ["PC", "Nintendo Switch", "PlayStation 4"],
        genre: "Simulation",
        description: "Build your dream farm",
        imageUrl: "/uploads/games/stardew-valley.jpg",
        totalAchievements: 2
    },
    {
        title: "Control",
        platform: ["PC", "PlayStation 5", "Xbox Series X/S"],
        genre: "Action-Adventure",
        description: "Supernatural adventure in the Oldest House",
        imageUrl: "/uploads/games/control.jpg",
        totalAchievements: 2
    },
    {
        title: "Halo Infinite",
        platform: ["PC", "Xbox Series X/S"],
        genre: "FPS",
        description: "Master Chief's latest adventure",
        imageUrl: "/uploads/games/halo.jpg",
        totalAchievements: 2
    },
    {
        title: "It Takes Two",
        platform: ["PC", "PlayStation 5", "Xbox Series X/S"],
        genre: "Co-op Adventure",
        description: "Cooperative adventure about relationships",
        imageUrl: "/uploads/games/it-takes-two.jpg",
        totalAchievements: 2
    }
];

const achievements = [
    {
        name: "Master of the Wild",
        description: "Complete all shrines in the game",
        points: 20,
        difficulty: "Expert",
        game: null
    },
    {
        name: "Dragon Slayer",
        description: "Defeat all dragons in the game",
        points: 15,
        difficulty: "Hard",
        game: null
    },
    {
        name: "Treasure Hunter",
        description: "Find all hidden treasures",
        points: 10,
        difficulty: "Medium",
        game: null
    },
    {
        name: "First Steps",
        description: "Complete the tutorial",
        points: 5,
        difficulty: "Easy",
        game: null
    },
    {
        name: "Speed Runner",
        description: "Complete the game under 3 hours",
        points: 20,
        difficulty: "Expert",
        game: null
    },
    {
        name: "Collector",
        description: "Collect all weapons in the game",
        points: 15,
        difficulty: "Hard",
        game: null
    },
    {
        name: "Explorer",
        description: "Discover all locations",
        points: 10,
        difficulty: "Medium",
        game: null
    },
    {
        name: "Perfect Parry",
        description: "Successfully parry 100 enemy attacks",
        points: 15,
        difficulty: "Hard",
        game: null
    },
    {
        name: "Completionist",
        description: "Achieve 100% completion",
        points: 20,
        difficulty: "Expert",
        game: null
    },
    {
        name: "No Hit Run",
        description: "Complete a boss fight without taking damage",
        points: 20,
        difficulty: "Expert",
        game: null
    },
    {
        name: "Master Chef",
        description: "Cook every recipe in the game",
        points: 10,
        difficulty: "Medium",
        game: null
    },
    {
        name: "Fashion Icon",
        description: "Collect all cosmetic items",
        points: 10,
        difficulty: "Medium",
        game: null
    },
    {
        name: "Speedster",
        description: "Win a race in under 2 minutes",
        points: 15,
        difficulty: "Hard",
        game: null
    },
    {
        name: "Pacifist",
        description: "Complete a level without defeating any enemies",
        points: 15,
        difficulty: "Hard",
        game: null
    },
    {
        name: "Team Player",
        description: "Complete 50 cooperative missions",
        points: 10,
        difficulty: "Medium",
        game: null
    },
    {
        name: "Easter Egg Hunter",
        description: "Find all hidden secrets",
        points: 15,
        difficulty: "Hard",
        game: null
    },
    {
        name: "Challenge Master",
        description: "Complete all challenge modes",
        points: 20,
        difficulty: "Expert",
        game: null
    },
    {
        name: "Survival Expert",
        description: "Survive for 24 in-game hours",
        points: 15,
        difficulty: "Hard",
        game: null
    },
    {
        name: "Combo King",
        description: "Perform a 100-hit combo",
        points: 20,
        difficulty: "Expert",
        game: null
    },
    {
        name: "Resource Manager",
        description: "Complete the game without buying items",
        points: 15,
        difficulty: "Hard",
        game: null
    },
    {
        name: "Time Traveler",
        description: "Visit all time periods",
        points: 10,
        difficulty: "Medium",
        game: null
    },
    {
        name: "Master Strategist",
        description: "Win without losing any units",
        points: 20,
        difficulty: "Expert",
        game: null
    },
    {
        name: "Puzzle Master",
        description: "Solve all optional puzzles",
        points: 15,
        difficulty: "Hard",
        game: null
    },
    {
        name: "Social Butterfly",
        description: "Max out all relationship levels",
        points: 10,
        difficulty: "Medium",
        game: null
    },
    {
        name: "Legendary Warrior",
        description: "Defeat the secret boss",
        points: 20,
        difficulty: "Expert",
        game: null
    },
    {
        name: "Master Collector",
        description: "Complete the in-game museum",
        points: 15,
        difficulty: "Hard",
        game: null
    }
];

async function seedDatabase() {
    try {
        await Game.deleteMany({});
        await Achievement.deleteMany({});
        const createdGames = await Game.insertMany(games);
        const achievementsWithGames = achievements.map((achievement, index) => {
            achievement.game = createdGames[index % createdGames.length]._id;
            return achievement;
        });
        await Achievement.insertMany(achievementsWithGames);
    } catch (error) {
        throw error;
    }
}
