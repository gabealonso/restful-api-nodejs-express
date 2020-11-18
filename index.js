import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

// Middlewares
app.use(bodyParser.json());

app.use('/users', usersRoutes);

// server listening
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

// ROUTES
app.get('/', (req, res) => res.send("Hi, welcome to the homepage!"));