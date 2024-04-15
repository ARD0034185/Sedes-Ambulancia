const { Router } = require('express');
const router = Router();
 
const MysqlConnection = require('../database/database');
 
// Obtener todo el material utilizado
router.get('/material-utilizado', (req, res) => {
    MysqlConnection.query('SELECT * FROM MaterialUtilizado WHERE status = 1;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});
 
// Obtener un elemento de material utilizado por su ID
router.get('/material-utilizado/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('SELECT * FROM MaterialUtilizado WHERE id = ? AND status = 1;', [id], (error, rows, fields) => {
        if (!error && rows.length > 0) {
            res.json(rows[0]);
        } else if (!error && rows.length === 0) {
            res.status(404).json({ error: 'Material used not found' });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});
 
// Registrar nuevo material utilizado
router.post('/material-utilizado', (req, res) => {
    const { inventario_id, ambulancia_id, paciente_id, cantidad_utilizada, UserId } = req.body;
    MysqlConnection.query('INSERT INTO MaterialUtilizado(inventario_id, ambulancia_id, paciente_id, cantidad_utilizada, UserId, status) VALUES (?, ?, ?, ?, ?, 1);',
        [inventario_id, ambulancia_id, paciente_id, cantidad_utilizada, UserId], (error, result) => {
            if (!error) {
                res.status(201).json({ Status: 'Material used registered', id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});
 
// Actualizar registro de material utilizado
router.put('/material-utilizado/:id', (req, res) => {
    const { id } = req.params;
    const { inventario_id, ambulancia_id, paciente_id, cantidad_utilizada, UserId } = req.body;
    MysqlConnection.query('UPDATE MaterialUtilizado SET inventario_id = ?, ambulancia_id = ?, paciente_id = ?, cantidad_utilizada = ?, UserId = ?, lastUpdate = CURRENT_TIMESTAMP WHERE id = ? AND status = 1;',
        [inventario_id, ambulancia_id, paciente_id, cantidad_utilizada, UserId, id], (error, result) => {
            if (!error && result.affectedRows > 0) {
                res.json({ Status: 'Material used updated' });
            } else if (!error && result.affectedRows === 0) {
                res.status(404).json({ error: 'Material used not found' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});
 
// Eliminar registro de material utilizado
router.delete('/material-utilizado/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('UPDATE MaterialUtilizado SET status = 0 WHERE id = ? AND status = 1;',
        [id], (error, result) => {
            if (!error && result.affectedRows > 0) {
                res.json({ Status: 'Material used deleted' });
            } else if (!error && result.affectedRows === 0) {
                res.status(404).json({ error: 'Material used not found' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
});
 
module.exports = router;