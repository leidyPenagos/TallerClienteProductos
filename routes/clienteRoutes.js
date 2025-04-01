import express from 'express';
import { obtenerClientes, crearCliente } from '../controllers/clienteController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

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
router.get('/', verificarToken, obtenerClientes);
router.post('/', verificarToken, crearCliente);

export default router;
