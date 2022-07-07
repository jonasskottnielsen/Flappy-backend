import express from 'express';

import Highscores from './Highscores';

const router = express.Router();

router.use('/highscores', Highscores);

router.get('/*', (request, response) => response.status(404).json({ message: 'Not Found' }));
router.post('/*', (request, response) => response.status(404).json({ message: 'Not Found' }));
router.delete('/*', (request, response) => response.status(404).json({ message: 'Not Found' }));

export default router;
