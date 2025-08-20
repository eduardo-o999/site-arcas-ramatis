import express, { Request } from 'express';
import { remultApi } from  'remult/remult-express';
import { Usuario } from './shared/Usuario';
import { Agendamento } from './shared/Agendamento';


// instalar knex e configurar!

    const app = express();
    const port = 3002;



    app.get('/', (req, res) => {
      res.send('Servidor backend está funcionando.');
    });

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(`API disponível em: http://localhost:${port}/api`);
    });
  } catch (err) {
    console.error('Falha ao iniciar o servidor:', err.message);
    process.exit(1);
  }
}

startServer();


