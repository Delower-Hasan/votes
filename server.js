// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cspOption from './csp-options.js';
import middlewareSse from './middleware-sse.js';
import { voteRouge, voteBleu, getVotes, getVoteRouge, getVoteBleu } from './model/vote.js';

// Création du serveur
const app = express();
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(middlewareSse());
app.use(express.static('public'));

// Ajouter les routes ici ...
app.get('/', (request, response) => {
    response.render('vote', {
        title: 'Vote',
        votes: getVotes()
    });
});

app.get('/vote', (request, response) => {
    response.initStream();
});

app.patch('/vote/rouge', (request, response) => {
    voteRouge();
    response.pushJson({ vote: getVoteRouge() }, 'vote-rouge');
    response.sendStatus(200);
});

app.patch('/vote/bleu', (request, response) => {
    voteBleu();
    response.pushJson({ vote: getVoteBleu() }, 'vote-bleu');
    response.sendStatus(200);
});

// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${ process.env.PORT }`);
