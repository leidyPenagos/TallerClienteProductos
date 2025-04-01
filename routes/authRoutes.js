import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un usuario con nombre, email y contraseña.
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 */
router.post('/register', registrarUsuario);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve un token JWT.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 */
router.post('/login', loginUsuario);

export default router;
