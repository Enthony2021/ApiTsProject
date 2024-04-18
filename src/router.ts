import {Router, Request, Response} from 'express';
import { 
  createMovie, 
  deleteMovie, 
  findMovieById, 
  getAllMovies, 
  updateMovie
} from './controllers/movieControllers';
import { validate } from './middleware/validationMiddleware';
import { movieCreateValidation } from './middleware/movieValidationMiddleware';

const router = Router();

router.get("/test", (req: Request, res:Response) => {
  res.status(200).send("API Working!!!");
});

router.get("/movie", getAllMovies);
router.get("/movie/:id", findMovieById);
router.delete("/movie/:id", deleteMovie);
router.post("/movie", movieCreateValidation(), validate, createMovie);
router.patch("/movie/:id", movieCreateValidation(), validate, updateMovie);

export default router;
