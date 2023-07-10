const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'consolas',
});

// Conexión a la base de datos MySQL
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Crear una instancia de Express
const app = express();

// Configurar middleware para recibir y analizar datos JSON
app.use(express.json());

app.use(cors());

// Ruta para obtener todos los datos
app.get('/datos', (req, res) => {
  const query = 'SELECT * FROM `consolas`';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos: ', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para insertar un dato
app.post('/datos', (req, res) => {
  const { campo2, campo3 } = req.body;
  const query = 'INSERT consolas VALUES (DEFAULT,?, ?)';
  connection.query(query, [campo2, campo3], (error, results) => {
    if (error) {
      console.error('Error al insertar el dato: ', error);
      res.status(500).json({ error: 'Error al insertar el dato' });
    } else {
      res.json({ message: 'Dato insertado correctamente' });
    }
  });
});

// Ruta para actualizar un dato
app.put('/datos/:id', (req, res) => {
  const id = req.params.id;
  const { campo2, campo3 } = req.body;
  const query = 'UPDATE consolas SET nombre = ?, dscripcion = ? WHERE id_consola = ?';
  connection.query(query, [campo2, campo3, id], (error, results) => {
    if (error) {
      console.error('Error al actualizar el dato: ', error);
      res.status(500).json({ error: 'Error al actualizar el dato' });
    } else {
      res.json({ message: 'Dato actualizado correctamente' });
    }
  });
});


// Ruta para eliminar un dato
app.delete('/datos/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM consolas WHERE id_consola = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar el dato: ', error);
      res.status(500).json({ error: 'Error al eliminar el dato' });
    } else {
      res.json({ message: 'Dato eliminado correctamente' });
    }
  });
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log('Servidor iniciado en el puerto 5000');
});
