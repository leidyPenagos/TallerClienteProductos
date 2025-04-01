import express from 'express';
import { login, register, logout } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión con su correo electrónico y contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       400:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite a un usuario registrarse proporcionando su nombre, correo electrónico y contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: El correo ya está registrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Cerrar sesión
 *     description: Permite a un usuario cerrar sesión eliminando su token de autenticación.
 *     tags:
 *       - Autenticación
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/logout', logout);

export default router;
