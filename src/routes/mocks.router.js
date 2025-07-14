import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Mocks
 *     description: Rutas para generar datos de prueba
 *
 * /api/mockingusers:
 *   get:
 *     summary: Obtener usuarios de prueba
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios de prueba
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * 
 * /api/mockingpets:
 *   get:
 *     summary: Obtener mascotas de prueba
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de mascotas de prueba
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 * 
 * /api/generatedata:
 *   post:
 *     summary: Registrar usuarios y mascotas de prueba
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios de prueba
 */

router.get("/mockingusers", mocksController.getUserMocks);
router.get("/mockingpets", mocksController.getPetMocks);
router.post("/generatedata",mocksController.postUserAndPetsMocks);

export default router;