const aioKey = "aio_IDIi07yUHWpvmNrdWfRGGlZUSrYo";
const url = 'https://io.adafruit.com/api/v2/LaraGenovese/feeds/led-de-prueba/data';
const formData = new FormData();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(process.env.DATABASE_URL='mysql://fo4typbzxyeqq9jqsfwt:pscale_pw_kbWBuOOyz0N2sL04HpRuAPbtpVpE4ORydz7ws65fdLc@aws.connect.psdb.cloud/proyecto?ssl={"rejectUnauthorized":true}');
connection.connect((err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});


const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.get("/status", (req, res) => {
  connection.query('SELECT * FROM boton_prendiendo LIMIT 1', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({
        error: err
      })
    }
    res.json(results[0].name);
  });
});

app.get("/on", (req, res) => {
  const updateQuery = 'UPDATE boton_prendiendo SET name = ?';
  const values = ['ON'];
  connection.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta de actualización:', error);
      // Manejar el error
    } else {
      console.log('Actualización exitosa. Filas afectadas:', results.affectedRows);
      // Hacer algo con los resultados
    }
  })

  console.log('Se ejecuto el UPDATE');

  formData.append('value', 'ON');

fetch(url, {
  method: 'POST',
  headers: {
    "X-AIO-Key": aioKey
  },
  body: formData
})
  .then(response => {
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
});
// query update
// post a adafruit
// res.status(200);

app.get("/off", (req, res) => {
  const updateQuery = 'UPDATE boton_prendiendo SET name = ?';
  const values = ['OFF'];
  value = 'OFF'; 
  connection.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta de actualización:', error);
      // Manejar el error
    } else {
      console.log('Actualización exitosa. Filas afectadas:', results.affectedRows);
      // Hacer algo con los resultados
    }
  })
formData.append('value', 'OFF');

fetch(url, {
  method: 'POST',
  headers: {
    "X-AIO-Key": aioKey
  },
  body: formData
})
  .then(response => {
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });

  console.log('Se ejecuto el UPDATE');

});

app.post("/registrarse", (req, res) => {
  const { nombre, mail, password } = req.body;
  console.log(req.body);
  const updateQuery = `INSERT INTO usuario SET nombre = ?, mail = ?, contrasenia = ?`;
  const values = [nombre, mail, password];
  connection.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta de actualización:', error);
      // Manejar el error
    } else {
      console.log('Actualización exitosa. Filas afectadas:', results.affectedRows);
      // Hacer algo con los resultados
    }
  })
  console.log("se corrio el insert")
});


app.post("/InicioSesion", (req, res) => {
  const {mailfront, passwordfront } = req.body;
  const sql = 'SELECT * FROM usuario WHERE mail = ? AND contrasenia = ?';
  console.log(mailfront, passwordfront);
  connection.query(sql,[mailfront,passwordfront], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta de actualización:', error);
      // Manejar el error
    } else {
      if (results.length > 0) {
        console.log("los resultados coinciden");
        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
      }
      else{
        console.log("los resultados no coinciden");
        res.status(401).json({ success: false, message: 'Inicio de sesión fallido' });
      }
    }
  })
  console.log("se corrio el insert")
});

////////////////////////////////////////////////////////

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});