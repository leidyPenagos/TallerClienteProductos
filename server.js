import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/database.js';
import clienteRoutes from './routes/clienteRoutes.js';
import productoRoutes from './routes/productoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import cors from 'cors';

dotenv.config();
conectarDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});
app.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('productos'); // Obtener clientes y sus productos
    const productos = await Producto.find().populate('cliente'); // Obtener productos y sus clientes
    res.render('index', { clientes, productos }); // Pasar los datos a la vista
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, precio, cliente } = req.body;
    const nuevoProducto = new producto({ nombre, precio, cliente });
    await nuevoProducto.save();
    res.redirect('/'); // Redirige a la página principal después de agregar el producto
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(` Documentación Swagger disponible en http://localhost:${PORT}/docs`);
});
