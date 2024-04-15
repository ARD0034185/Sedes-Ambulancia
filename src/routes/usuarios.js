const { Router } = require('express');
const router = Router();

const MysqlConnection = require('../database/database');

// Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
    MysqlConnection.query('SELECT * FROM usuarios;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Obtener un usuario por su ID
router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('SELECT * FROM usuarios WHERE id = ?;', [id], (error, rows, fields) => {
        if (!error && rows.length > 0) {
            res.json(rows[0]);
        } else if (!error && rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Crear un nuevo usuario
router.post('/usuarios', (req, res) => {
    const { id, nombre_usuario, contrasenia, UserId } = req.body;
    MysqlConnection.query('INSERT INTO usuarios(id, nombre_usuario, contrasenia, UserId) VALUES (?, ?, ?, ?);',
        [id, nombre_usuario, contrasenia, UserId], (error, result) => {
            if (!error) {
                res.status(201).json({ Status: 'User saved', id });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

// Actualizar un usuario existente
router.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, contrasenia, UserId } = req.body;
    MysqlConnection.query('UPDATE usuarios SET nombre_usuario = ?, contrasenia = ?, UserId = ?, lastUpdate = CURRENT_TIMESTAMP WHERE id = ?;',
        [nombre_usuario, contrasenia, UserId, id], (error, result) => {
            if (!error && result.affectedRows > 0) {
                res.json({ Status: 'User updated' });
            } else if (!error && result.affectedRows === 0) {
                res.status(404).json({ error: 'User not found' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});

// Eliminar un usuario
router.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('DELETE FROM usuarios WHERE id = ?;', [id], (error, result) => {
        if (!error && result.affectedRows > 0) {
            res.json({ Status: 'User deleted' });
        } else if (!error && result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

module.exports = router;
