import express from 'express';
import v1 from './v1/';

const router = express.Router();

router.use(express.json());

router.use('/v1', v1);
router.get('/*', (request, response) => response.status(404).json({ message: 'Mr. Flappy' }));
router.post('/*', (request, response) => response.status(404).json({ message: 'Mr. Flappy' }));

export default router;