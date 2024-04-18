import { Request, Response } from 'express';
import { MovieModel } from '../models/Movie';
import Logger from "../../config/logger";
import mongoose from 'mongoose';
import { error } from 'console';

export const createMovie = async(req: Request, res: Response) => {
  try {

    const data = req.body;
    const movie = await MovieModel.create(data);
    
    return res.status(201).json(movie);

  } catch (e: any) {
    Logger.error(`Erro no Sistema: ${e.message}`);
    return res.status(500).json({
      error: "Please, try later."
    })
  }
}

export const findMovieById = async(req: Request, res: Response) => {
  try {

    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: "O filme não existe"
      })
    }

    const movie = await MovieModel.findById(id);

    if(!movie) {
      return res.status(404).json({
        error: "O filme não existe."
      });
    }

    return res.status(200).json(movie);

  } catch (e: any) {
    Logger.error(`Erro no Sistema: ${e.message}`);
    return res.status(500).json({
      error: "Please, try later."
    })
  }
}

export const getAllMovies = async(req: Request, res: Response) => {
  try {

    const movies = await MovieModel.find();
    return res.status(200).json(movies);

  } catch (e: any) {
    Logger.error(`Erro no Sistema: ${e.message}`);
    return res.status(500).json({
      error: "Please, try later."
    })
  }
}

export const deleteMovie = async(req: Request, res: Response) => {
  try {

    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: "Movie was not found!"
      })
    }

    const movieDeleted = await MovieModel.findByIdAndDelete(id);

    if(!movieDeleted) {
      return res.status(404).json({
        error: "Movie was not found!"
      })
    }

    return res.status(204).json({
      "The movie was deleted": movieDeleted
    });

  } catch (e: any) {
    Logger.error(`Erro no Sistema: ${e.message}`);
    return res.status(500).json({
      error: "Please, try later."
    })
  }
}

export const updateMovie = async(req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: "Movie was not found!"
      })
    }

    const movie = await MovieModel.findById(id);

    if(!movie) {
      return res.status(404).json({
        error: "Movie was not found!"
      })
    }

    await MovieModel.updateOne({_id: id}, data);
    
    const movieUpdated = await MovieModel.findById(id);

    return res.status(200).json(movieUpdated);

  } catch (e: any) {
    Logger.error(`Erro no Sistema: ${e.message}`);
    return res.status(500).json({
      error: "Please, try later."
    })
  }
}


