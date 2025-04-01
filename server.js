import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import conectarDB from './config/database.js';
import clienteRoutes from './routes/clienteRoutes.js';
import productoRoutes from './routes/productoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import cors from 'cors';
import methodOverride from 'method-override'; // Middleware para soportar PUT y DELETE en formularios HTML
import { verificarAutenticacion } from './middlewares/authMiddleware.js';

// Importar modelos de MongoDB
import Cliente from './models/Cliente.js';
import Producto from './models/Producto.js';

dotenv.config();
conectarDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride('_method')); // Configurar method-override para soportar PUT y DELETE
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

// Rutas de API
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta protegida para la página principal
app.get('/', verificarAutenticacion, async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('productos'); 
    const productos = await Producto.find().populate('cliente'); 
    res.render('index', { clientes, productos });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Ruta para la página de inicio de sesión
app.get('/inicio', (req, res) => {
  res.render('inicio', { error: null, success: null });
});

// Ruta para agregar un producto
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, precio, cliente } = req.body;
    const nuevoProducto = new Producto({ nombre, precio, cliente });
    await nuevoProducto.save();
    res.redirect('/'); // Redirige a la página principal después de agregar el producto
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// Ruta para actualizar un cliente
app.put('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.redirect('/'); // Redirige a la página principal después de actualizar
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});

// Ruta para eliminar un cliente
app.delete('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id);
    if (!clienteEliminado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.redirect('/'); // Redirige a la página principal después de eliminar
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
});

// Ruta para actualizar un producto
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true });
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.redirect('/'); // Redirige a la página principal después de actualizar
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.redirect('/'); // Redirige a la página principal después de eliminar
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/docs`);
});
