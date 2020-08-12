const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
        if (err) next(err);

        response.json(res.rows);
    });
});

router.get('/:id', (request, response, next) => {
    const { id } = request.params;
    pool.query('SELECT * FROM monsters WHERE id = $1', [id], (err, res) => {
        if (err) next(err);

        response.json(res.rows);
    });
});

router.post('/', (request, response, next) => {

    const { name, personality } = request.body;
    pool.query(
        'INSERT INTO monsters(name, personality) VALUES($1, $2)',
        [name, personality],
        (err, res) => {
            if (err) next(err);

            response.redirect('/monsters');
        });
});

router.put('/:id', (request, response, next) => {
    const { id } = request.params;
    const { name, personality } = request.body;
    pool.query(
        'UPDATE monsters SET name = ($1), personality = ($2) WHERE id = ($3)',
        [name, personality, id],
        (err, res) => {
            if (err) next(err);

            response.redirect(200, '/monsters');
        });
});

router.delete('/:id', (request, response, next) => {
    const { id } = request.params;
    pool.query('DELETE FROM monsters WHERE id = $1', [id], (err, res) => {
        if (err) next(err);

        response.redirect(200, '/monsters');
    });
});

module.exports = router;