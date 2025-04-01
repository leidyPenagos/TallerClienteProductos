import Cliente from '../models/Cliente.js';

export const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('pedidos');
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

export const crearCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion } = req.body;
    const nuevoCliente = new Cliente({ nombre, email, telefono, direccion });
    await nuevoCliente.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    res.status(400).render('index', { error: 'Error al crear el cliente', clientes: [], productos: [] });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, direccion } = req.body;
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, { nombre, email, telefono, direccion }, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.redirect('/');
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(400).json({ error: 'Error al actualizar el cliente' });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id);
    if (!clienteEliminado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
