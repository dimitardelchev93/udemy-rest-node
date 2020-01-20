const { Genre, validate } = require('../models/genre');
const router = require('express').Router();

router.get('/', async(req, res) => {
    res.send(await Genre.find());
});

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        return res.status(404).send('not found');
    }

    res.send(genre);
});

router.post('/', async(req, res) => {
    const genre = req.body;
    const { error } = validate(genre);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    res.send(await Genre.insertMany(genre));
});

router.put('/:id', async(req, res) => {
    const update = req.body;
    const { error } = validate(update);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, update);

    if (!genre) {
        return res.status(404).send('not found');
    }

    res.send(genre);
});

router.delete('/:id', async(req, res) => {
    const genre = await Genre.deleteOne({ id: req.params.id });

    if (!genre) {
        return res.status(404).send('not found');
    }

    res.send(genre);
});

module.exports = router;
