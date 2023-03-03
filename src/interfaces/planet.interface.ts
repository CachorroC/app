export interface intPlanet {
  _id: string;
  name: string;
  orderFromSun: number;
  hasRings: boolean;
  mainAtmosphere: any[];
  surfaceTemperatureC: SurfaceTemperatureC;
}

export interface SurfaceTemperatureC {
  min: number;
  max: number;
  mean: number;
}
