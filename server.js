const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb+srv://sct:iS8HtDdXKHyfjahI@cluster0.mg20q.mongodb.net/project_api')
    .then(() => {
        console.log('Connected to MongoDB Atlas successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Routes
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const gameRoutes = require('./src/routes/gameRoutes');
const achievementRoutes = require('./src/routes/achievementRoutes');

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/games', gameRoutes);
app.use('/achievements', achievementRoutes);

// Add view engine setup
app.set('view engine', 'ejs');
app.set('views', './src/views');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
