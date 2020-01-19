const Joi = require('joi');
const express = require('express');
const router = express.Router();

var genres = [
    {
        "id": 1,
        "name": "asd213"
    },
    {
        "id": 2,
        "name": "asd214"
    },
    {
        "id": 3,
        "name": "asd215"
    }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const genre = genres.find(genre => genre.id === id);

    if (!genre) {
        return res.status(404).send('not found');
    }

    res.send(genre);
});

router.post('/', (req, res) => {
    const genre = req.body;
    const { error } = validateGenre(genre);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genres.push({
        id: genres.length + 1,
        name: genre.name
    });

    res.send(genres);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const genre = genres.find(genre => genre.id === id);

    if (!genre) {
        return res.status(404).send('not found');
    }

    const update = req.body;
    const { error } = validateGenre(update);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genre.name = update.name;

    res.send(genres);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const genre = genres.find(genre => genre.id === id);

    if (!genre) {
        return res.status(404).send('not found');
    }

    genres = genres.filter(genre => genre.id !== id);

    res.send(genres);
});

function validateGenre(genre) {
    return Joi.validate(genre, {
        name: Joi.string().min(3).max(20).required()
    });
}

module.exports = router;
