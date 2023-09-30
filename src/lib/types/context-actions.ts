import { Category } from './carpetas';

export interface IntAction{
  type: ActionType
  sortDirection: boolean;
  search?: string;
  category? : Category

}

export type ActionType= 'filter' | 'search' | 'sort' | 'category' | 'categoryTag' | 'numero' | 'nombre' | 'primerNombre' | 'primerApellido' | 'fecha'