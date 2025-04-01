import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictPopulate', false);

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Base de datos conectada correctamente');
  } catch (error) {
    console.error('Error en la conexión a MongoDB:', error.message);
    process.exit(1); // Finaliza la aplicación si no se puede conectar
  }
};

// Evento para manejar la desconexión
mongoose.connection.on('disconnected', () => {
  console.log('Conexión a MongoDB cerrada');
});

// Evento para manejar errores después de la conexión inicial
mongoose.connection.on('error', (error) => {
  console.error('Error en la conexión a MongoDB:', error.message);
});

export default conectarDB;
