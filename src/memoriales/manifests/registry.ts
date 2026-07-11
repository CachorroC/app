import { aportandoLiquidacionCredito } from './aportando-liquidacion-credito';
import { aportando291y292 } from './aportando-291-y-292';
import type { MemorialTemplate } from './types';

export const memorialesRegistry = {
  [ aportandoLiquidacionCredito.id ]: aportandoLiquidacionCredito,
  [ aportando291y292.id ]           : aportando291y292,
} satisfies Record<string, MemorialTemplate>;

export const getTemplateById = ( id: string ): MemorialTemplate | undefined => {
  return ( memorialesRegistry as Record<string, MemorialTemplate> )[ id ];
};
