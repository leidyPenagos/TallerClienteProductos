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
import methodOverride from 'method-override'; 
import { verificarAutenticacion } from './middlewares/authMiddleware.js';


import Cliente from './models/Cliente.js';
import Producto from './models/Producto.js';

dotenv.config();
conectarDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride('_method')); 
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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


app.get('/inicio', (req, res) => {
  res.render('inicio', { error: null, success: null });
});


app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, cliente } = req.body;
    if (!nombre || !precio || !cliente) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const nuevoProducto = new Producto({ nombre, descripcion, precio, stock, cliente });
    await nuevoProducto.save();
    res.redirect('/');
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});


app.put('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, direccion } = req.body;
    if (!nombre || !email || !telefono || !direccion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, { nombre, email, telefono, direccion }, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.redirect('/');
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});


app.delete('/api/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id);
    if (!clienteEliminado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.redirect('/');
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
});


app.put('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, cliente } = req.body;
    if (!nombre || !precio || !cliente) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const productoActualizado = await Producto.findByIdAndUpdate(id, { nombre, descripcion, precio, stock, cliente }, { new: true });
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.redirect('/');
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});


app.delete('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.redirect('/');
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/docs`);
});
