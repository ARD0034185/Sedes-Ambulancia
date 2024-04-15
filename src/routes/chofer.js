const { Router } = require('express');
const router = Router();

const MysqlConnection = require('../database/database');

// Obtener todos los choferes
router.get('/chofer', (req, res) => {
    MysqlConnection.query('SELECT * FROM chofer;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Obtener un chofer por su ID
router.get('/chofer/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('SELECT * FROM chofer WHERE id = ?;', [id], (error, rows, fields) => {
        if (!error && rows.length > 0) {
            res.json(rows[0]);
        } else if (!error && rows.length === 0) {
            res.status(404).json({ error: 'Driver not found' });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Crear un nuevo chofer
router.post('/chofer', (req, res) => {
    const { id, nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId, categoria_licencia, antecedentes, hora_Entrada, hora_Salida, sueldo } = req.body;
    MysqlConnection.query('INSERT INTO persona(id, nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); INSERT INTO chofer(id, categoria_licencia, antecedentes, hora_Entrada, hora_Salida, sueldo, UserId) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [id, nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId, id, categoria_licencia, antecedentes, hora_Entrada, hora_Salida, sueldo, UserId], (error, result) => {
            if (!error) {
                res.status(201).json({ Status: 'Driver saved', id });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

// Actualizar un chofer existente
router.put('/chofer/:id', (req, res) => {
    const { id } = req.params;
    const { nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId, categoria_licencia, antecedentes, hora_Entrada, hora_Salida, sueldo } = req.body;
    MysqlConnection.query('UPDATE persona SET nombres = ?, primerApellido = ?, segundoApellido = ?, carnet = ?, fechaNacimiento = ?, direccion = ?, celular = ?, lastUpdate = CURRENT_TIMESTAMP, UserId = ? WHERE id = ?; UPDATE chofer SET categoria_licencia = ?, antecedentes = ?, hora_Entrada = ?, hora_Salida = ?, sueldo = ?, UserId = ? WHERE id = ?;',
        [nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId, id, categoria_licencia, antecedentes, hora_Entrada, hora_Salida, sueldo, UserId, id], (error, result) => {
            if (!error && result[0].affectedRows > 0 && result[1].affectedRows > 0) {
                res.json({ Status: 'Driver updated' });
            } else if (!error && result[0].affectedRows === 0 && result[1].affectedRows === 0) {
                res.status(404).json({ error: 'Driver not found' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

// Eliminar un chofer
router.delete('/chofer/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('DELETE FROM chofer WHERE id = ?; DELETE FROM persona WHERE id = ?;',
        [id, id], (error, result) => {
            if (!error && result[0].affectedRows > 0 && result[1].affectedRows > 0) {
                res.json({ Status: 'Driver deleted' });
            } else if (!error && result[0].affectedRows === 0 && result[1].affectedRows === 0) {
                res.status(404).json({ error: 'Driver not found' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

module.exports = router;
