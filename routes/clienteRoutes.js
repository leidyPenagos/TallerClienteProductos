import express from 'express';
import { 
  obtenerClientes, 
  crearCliente, 
  actualizarCliente, 
  eliminarCliente 
} from '../controllers/clienteController.js';
import { verificarToken, verificarAutenticacion } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     description: Retorna una lista de clientes almacenados en la base de datos.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente.
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Agrega un nuevo cliente a la base de datos.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente.
 */
router.get('/', verificarAutenticacion, obtenerClientes);
router.post('/', crearCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     description: Actualiza los datos de un cliente existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a actualizar.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 *   delete:
 *     summary: Eliminar un cliente
 *     description: Elimina un cliente existente de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a eliminar.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 */
router.put('/:id', actualizarCliente);
router.delete('/:id', verificarToken, eliminarCliente);

export default router;
