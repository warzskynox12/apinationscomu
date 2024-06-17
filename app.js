const express = require('express');
const NationsAPI = require('nationsapi');
const cors = require('cors');

const app = express();
const api = new NationsAPI('d74g32Q8nBfid48A7c8BTks4JRDkTL');

// Middleware CORS
app.use(cors(
    {
        origin: '*',
        methods: ['GET'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

// Route principale
app.get('/', (req, res) => { 
    res.json({ message: 'Hello World!' });
});

// Route pour obtenir le nombre de joueurs
app.get('/playercount', (req, res) => {
    api.getPlayersCount()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du nombre de joueurs:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération du nombre de joueurs' });
        });
});

app.get('/notations', (req, res) => {
    const week = req.query.week;
    const country = req.query.country;
    const server = req.query.server;
    //comment recupêrais les paramètres de la requête

    api.getNotations(week, country, server)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des notations:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des notations' });
        });
});




// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});
