import express from 'express';
import usuarioController from '../controllers/usuario.js';

const router = express.Router();

router.get('/', usuarioController.findAll);
router.post('/', usuarioController.create); 
router.get('/:id', usuarioController.findOne);
router.put('/', usuarioController.update);
router.delete('/:id', usuarioController.remove);

export default router;
