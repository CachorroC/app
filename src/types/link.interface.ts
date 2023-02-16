/** @format */

import { ObjectId } from "mongodb";

/** @format */
export type intLink = {
  name: string;
  url: string;
  state: boolean;
  icon: string;
  lastUpdate: LastUpdate;
  _id?: ObjectId;
};

export interface LastUpdate {
  $timestamp: string;
}
export type Open = Boolean