import { fetchNotas } from './fetcher';

export const getNotas = async ( carpetaId?: number ) => {
  'use cache';

  return await fetchNotas( carpetaId );
};
