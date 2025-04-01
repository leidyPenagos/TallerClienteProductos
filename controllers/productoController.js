import Producto from '../models/Producto.js';

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, cliente } = req.body;
    const nuevoProducto = new Producto({ nombre, descripcion, precio, stock, cliente });
    await nuevoProducto.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(400).render('index', { error: 'Error al crear el producto', clientes: [], productos: [] });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, cliente } = req.body;
    const productoActualizado = await Producto.findByIdAndUpdate(id, { nombre, descripcion, precio, stock, cliente }, { new: true });
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.redirect('/');
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(400).json({ error: 'Error al actualizar el producto' });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
