import { model, Schema } from 'mongoose';
import { describe } from 'node:test';
import { title } from 'process';

const movieSchema = new Schema(
  {
    title: {type: String},
    rating: {type: Number},
    description: {type: String},
    director: {type: String},
    stars: {type: Array},
    poster: {type: String}
  },
  {
    timestamps: true
  }
);

export const MovieModel = model("Movie", movieSchema);