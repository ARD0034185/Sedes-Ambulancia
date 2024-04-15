const { Router } = require('express');
const router = Router();

const MysqlConnection = require('../database/database');

router.get('/', (req, res) => {
    res.status(200).json('Server on port 9090 and database is connected');
});

router.get('/persona', (req, res) => {
    MysqlConnection.query('SELECT * FROM persona;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

router.get('/persona/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('SELECT * FROM persona WHERE id = ?;', [id], (error, rows, fields) => {
        if (!error && rows.length > 0) {
            res.json(rows[0]);
        } else if (!error && rows.length === 0) {
            res.status(404).json({ error: 'Person not found' });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

router.post('/:persona', (req, res) => {
    const { nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId } = req.body;
    MysqlConnection.query('INSERT INTO persona(nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId], (error, result) => {
            if (!error) {
                res.status(201).json({ Status: 'Person saved', id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

router.put('/persona/:id', (req, res) => {
    const { id } = req.params;
    const { nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId } = req.body;
    MysqlConnection.query('UPDATE persona SET nombres = ?, primerApellido = ?, segundoApellido = ?, carnet = ?, fechaNacimiento = ?, direccion = ?, celular = ?, lastUpdate = CURRENT_TIMESTAMP, UserId = ? WHERE id = ?;',
        [nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId, id], (error, result) => {
            if (!error && result.affectedRows > 0) {
                res.json({ Status: 'Person updated' });
            } else if (!error && result.affectedRows === 0) {
                res.status(404).json({ error: 'Person not found' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

router.delete('/persona/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('DELETE FROM persona WHERE id = ?;', [id], (error, result) => {
        if (!error && result.affectedRows > 0) {
            res.json({ Status: 'Person deleted' });
        } else if (!error && result.affectedRows === 0) {
            res.status(404).json({ error: 'Person not found' });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

module.exports = router;
