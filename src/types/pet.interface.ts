/** @format */

import { ObjectId } from "mongodb";

export type Pet = {
  name: string;
  owner_name: string;
  species: string;
  age: number;
  poddy_trained: boolean;
  image_url: string;
  diet: string[];
  likes: string[];
  dislikes: string[];
  _id?: ObjectId;
};

export type Pets = Pet[];
