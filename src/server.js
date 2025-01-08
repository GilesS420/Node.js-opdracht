const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/uploads', express.static('public/uploads'));

// MongoDB connection
mongoose.connect('mongodb+srv://sct:iS8HtDdXKHyfjahI@cluster0.mg20q.mongodb.net/project_api')
    .then(() => {
        console.log('Connected to MongoDB Atlas successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Routes
const gameRoutes = require('./routes/gameRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const apiRoutes = require('./routes/apiRoutes');

app.use('/games', gameRoutes);
app.use('/achievements', achievementRoutes);
app.use('/', apiRoutes);

// Add view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
