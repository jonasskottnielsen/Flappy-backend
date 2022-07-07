import { Router } from 'express';

import Highscores from '../../controllers/Highscores/Highscores';

const router = Router();

router.get('/', Highscores.getHighscores);
router.post('/', Highscores.postHighscore);

export default router;
