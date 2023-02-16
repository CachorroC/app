/** @format */

import { ObjectId } from "mongodb";

export type Movie = {
  title: string;
  metacritic: number;
  plot: string;
  id?: ObjectId;
};

export type MovieList = Movie[];
