import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Sessions
 *     description: Rutas para gestionar sesiones de usuario
 *
 * /api/sessions/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 payload:
 *                   type: string
 *       400:
 *         description: Datos inválidos o faltantes o usuario ya existe
 *
 * /api/sessions/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Datos incompletos o contraseña incorrecta
 *       404:
 *         description: Usuario no existe
 *
 * /api/sessions/current:
 *   get:
 *     summary: Obtener la sesión actual del usuario autenticado
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Sesión actual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 payload:
 *                   type: object
 *       401:
 *         description: No autenticado
 *
 * /api/sessions/unprotectedLogin:
 *   post:
 *     summary: Iniciar sesión sin protección (solo para pruebas)
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sesión iniciada sin protección
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Datos incompletos o contraseña incorrecta
 *       404:
 *         description: Usuario no existe
 *
 * /api/sessions/unprotectedCurrent:
 *   get:
 *     summary: Obtener la sesión actual sin protección (solo para pruebas)
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Sesión actual sin protección
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 payload:
 *                   type: object
 */

router.post('/register',sessionsController.register);
router.post('/login',sessionsController.login);
router.get('/current',sessionsController.current);
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default router;