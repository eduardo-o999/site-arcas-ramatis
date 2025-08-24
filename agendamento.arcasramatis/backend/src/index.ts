import express from 'express';
// import { User } from './shared/Users';
// import { Appointment } from './shared/Appointments';
import { api } from "./api.ts";


// instalar knex e configurar!

const app = express();
const port = 3000;

app.use(api);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Servidor iniciado em: http://localhost:${port}`));