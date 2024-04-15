const { Router } = require('express');
const router = Router();

const MysqlConnection = require('../database/database');

router.get('/', (req, res) => {
    res.status(200).json('Server on port 9090 and database is connected');
});

router.get('/ambulancia', (req, res) => {
    MysqlConnection.query('SELECT * FROM ambulancia;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

router.get('/ambulancia/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('SELECT * FROM ambulancia WHERE id = ?;', [id], (error, rows, fields) => {
        if (!error && rows.length > 0) {
            res.json(rows[0]);
        } else if (!error && rows.length === 0) {
            res.status(404).json({ error: 'Ambulance not found' });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

router.post('/ambulancia', (req, res) => {
    const { numero_placa, modelo, conductor_id, UserId } = req.body;
    MysqlConnection.query('INSERT INTO ambulancia(numero_placa, modelo, conductor_id, UserId) VALUES (?, ?, ?, ?);',
        [numero_placa, modelo, conductor_id, UserId], (error, result) => {
            if (!error) {
                res.status(201).json({ Status: 'Ambulance saved', id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

router.put('/ambulancia/:id', (req, res) => {
    const { numero_placa, modelo, conductor_id, UserId } = req.body;
    const { id } = req.params;
    MysqlConnection.query('UPDATE ambulancia SET numero_placa = ?, modelo = ?, conductor_id = ?, UserId = ? WHERE id = ?;',
        [numero_placa, modelo, conductor_id, UserId, id], (error, result) => {
            if (!error && result.affectedRows > 0) {
                res.json({ Status: 'Ambulance updated' });
            } else if (!error && result.affectedRows === 0) {
                res.status(404).json({ error: 'Ambulance not found' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

router.delete('/ambulancia/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('DELETE FROM ambulancia WHERE id = ?;', [id], (error, result) => {
        if (!error && result.affectedRows > 0) {
            res.json({ Status: 'Ambulance deleted' });
        } else if (!error && result.affectedRows === 0) {
            res.status(404).json({ error: 'Ambulance not found' });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

module.exports = router;
