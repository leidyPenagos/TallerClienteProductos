import express from 'express';
import { obtenerProductos, crearProducto } from '../controllers/productoController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Devuelve una lista de productos disponibles.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente.
 *   post:
 *     summary: Agregar un nuevo producto
 *     description: Crea un nuevo producto en la base de datos.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Producto agregado correctamente.
 */
router.get('/', verificarToken, obtenerProductos);
router.post('/', verificarToken, crearProducto);

export default router;
