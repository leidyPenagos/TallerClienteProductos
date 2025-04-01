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
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear cliente' });
  }
};
