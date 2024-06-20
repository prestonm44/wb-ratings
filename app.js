
import { Movie, Rating, User } from './src/model.js'
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));

app.get('/api/movies', async (req,res) => {
    const allMovies = await Movie.findAll();
    res.json(allMovies)
});

app.get('/api/movies/:movieId', async (req,res) => {
    const { movieId } = req.params;
    const movie = await Movie.findByPk(movieId);
    res.json(movie);
});