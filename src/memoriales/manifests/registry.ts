import { aportandoLiquidacionCredito } from './aportando-liquidacion-credito';
import { aportando291y292 } from './aportando-291-y-292';
import type { MemorialTemplate } from './types';
import { impulso_calificacion_demanda } from './impulso_calificacion_demanda';
import { memorial_notificaciones_ley_2213_de_2022_manual_domina_2025 } from './memorial_notificaciones_ley_2213_de_2022_manual_domina_2025';

export const memorialesRegistry = {
  [ aportandoLiquidacionCredito.id ] : aportandoLiquidacionCredito,
  [ aportando291y292.id ]            : aportando291y292,
  [ impulso_calificacion_demanda.id ]: impulso_calificacion_demanda,
  [ memorial_notificaciones_ley_2213_de_2022_manual_domina_2025.id ]:
    memorial_notificaciones_ley_2213_de_2022_manual_domina_2025,
} satisfies Record<string, MemorialTemplate>;

export const getTemplateById = ( id: string ): MemorialTemplate | undefined => {
  return ( memorialesRegistry as Record<string, MemorialTemplate> )[ id ];
};
