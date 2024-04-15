const { Router } = require('express');
const router = Router();
 
const MysqlConnection = require('../database/database');
 
// Obtener todos los usuarios
router.get('/usuario', (req, res) => {
    MysqlConnection.query('SELECT * FROM Usuario WHERE status = 1;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});
 
// Obtener un usuario por su ID
router.get('/usuario/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('SELECT * FROM Usuario WHERE id = ? AND status = 1;', [id], (error, rows, fields) => {
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
router.post('/usuario', (req, res) => {
    const { nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId, nombre_usuario, contrasenia } = req.body;
   
    // Insertar en la tabla Persona
    MysqlConnection.query('INSERT INTO Persona(nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId], (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: 'Internal server error' });
            }
           
            // Obtener el ID generado para la persona
            const personaId = result.insertId;
 
            // Insertar en la tabla Usuario
            MysqlConnection.query('INSERT INTO Usuario(id, nombre_usuario, contrasenia, UserId) VALUES (?, ?, ?, ?);',
                [personaId, nombre_usuario, contrasenia, UserId], (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                   
                    res.status(201).json({ Status: 'User saved', id: personaId });
                });
        });
});
 
 
// Actualizar un usuario existente
router.put('/usuario/:id', (req, res) => {
    const { id } = req.params;
    const { nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId, nombre_usuario, contrasenia } = req.body;
 
    // Actualizar los datos en la tabla Persona
    MysqlConnection.query('UPDATE Persona SET nombres = ?, primerApellido = ?, segundoApellido = ?, carnet = ?, fechaNacimiento = ?, direccion = ?, celular = ?, lastUpdate = CURRENT_TIMESTAMP, UserId = ? WHERE id = ? AND status = 1',
        [nombres, primerApellido, segundoApellido, carnet, fechaNacimiento, direccion, celular, UserId, id], (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: 'Internal server error' });
            }
 
            // Verificar si se afectaron filas en la tabla Persona
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
 
            // Una vez que se hayan actualizado los datos en la tabla Persona, actualizamos los datos en la tabla Usuario
            MysqlConnection.query('UPDATE Usuario SET nombre_usuario = ?, contrasenia = ?, UserId = ? WHERE id = ? AND status = 1',
                [nombre_usuario, contrasenia, UserId, id], (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
 
                    // Verificar si se afectaron filas en la tabla Usuario
                    if (result.affectedRows === 0) {
                        return res.status(404).json({ error: 'User not found' });
                    }
 
                    // Si tanto los datos de la persona como del usuario se actualizaron correctamente, responder con éxito
                    res.json({ Status: 'User updated' });
                });
        });
});
 
// Eliminar un usuario
router.delete('/usuario/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('UPDATE Usuario SET status = 0 WHERE id = ? AND status = 1', [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Verificar si se afectaron filas en la tabla Usuario
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
 
        // Una vez que se haya actualizado el estado del usuario en la tabla Usuario,
        // procedemos a actualizar el estado del usuario en la tabla Persona
        MysqlConnection.query('UPDATE Persona SET status = 0 WHERE id = ? AND status = 1', [id], (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            // Verificar si se afectaron filas en la tabla Persona
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
 
            // Si ambos usuarios se actualizaron correctamente, responder con éxito
            res.json({ Status: 'User deleted' });
        });
    });
});
 
module.exports = router;
 
