import express from 'express';
import router from './routes';

const PORT = 3006;
const app = express();

app.use(express.json());//MIDDLEWARE para procesar JSON
app.use('/', router);

//Conectar a la base de datos
import { connectDB } from './db';
connectDB();


//Inicializar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

export default app;