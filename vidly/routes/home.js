const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Nothing to see here!!!');
});

module.exports = router;
