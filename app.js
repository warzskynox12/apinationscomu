const express = require('express');
const NationsAPI = require('nationsapi');
const cors = require('cors');

const app = express();
const api = new NationsAPI('d74g32Q8nBfid48A7c8BTks4JRDkTL');


app.use(cors(
    {
        origin: '*',
        methods: ['GET'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

app.use(express.static('public'));


app.get('/', (req, res) => { 
    res.json({ message: 'Hello World!' });
});


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
    const server = req.query.server

    api.getNotations(week, country, server)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des notations:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des notations' });
        });
});

app.get('/user', (req, res) => {
    const player = req.query.player;
    api.getUser(player)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations du joueur:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des informations du joueur' });
        });
});

app.get('/country', (req, res) => {
    const country2 = req.query.country;
    const server2 = req.query.server;
    api.getCountry(server2, country2)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations du pays:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des informations du pays' });
        });
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});
