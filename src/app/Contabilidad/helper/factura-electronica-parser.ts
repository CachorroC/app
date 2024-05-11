import { RawFactura,
  RawFactura1,
  RawFactura2,
  incomingRawFactura, } from '#@/lib/types/contabilidad';
import { JsonObject } from '@prisma/client/runtime/library';

export function parseFacturaElectronica(
  qrString: string 
) {
  const facturaMap = new Map<keyof RawFactura, string | Date>();

  const firstMatcher = qrString.matchAll(
    /([a-z0-9A-Z_]+)(?::|=)(?:['\s"])?([a-z0-9A-Z_:\-./?=]+)(['\s\n"])?/gm,
  );

  for ( const matchedKeyValues of firstMatcher ) {
    console.log(
      matchedKeyValues 
    );
    facturaMap.set(
      matchedKeyValues[ 1 ], matchedKeyValues[ 2 ] 
    );
  }

  let newFactura, responseFactura: incomingRawFactura;

  const pruebaSiExisteNumFactura = facturaMap.get(
    'NumFac' 
  );

  if ( !pruebaSiExisteNumFactura ) {
    newFactura = Object.fromEntries(
      facturaMap 
    ) as RawFactura1;
    responseFactura = {
      facturaElectronica: qrString,
      CUFE              : newFactura.CUFE,
      secondaryFactura  : newFactura as JsonObject,
      fecha             : new Date(
        `${ newFactura.FechaFactura }T${ newFactura.HoraFactura }` 
      ),
      id : newFactura.NroFactura,
      nit: Number(
        newFactura.NitFacturador 
      ),
      valorBase   : newFactura.ValorFactura,
      valorIva    : newFactura.ValorIVA,
      valorOtroImp: newFactura.ValorOtrosImpuestos,
      valorTotal  : newFactura.ValorTotalFactura,
      hasIva      : parseInt(
        newFactura.ValorIVA 
      ) === 0
        ? false
        : true,
      hasOtroImp: parseInt(
        newFactura.ValorOtrosImpuestos 
      ) === 0
        ? false
        : true,
      hasIcui: parseInt(
        newFactura.ValorOtrosImpuestos 
      ) === 0
        ? false
        : true,
      hasImpoConsumo:
        parseInt(
          newFactura.ValorOtrosImpuestos 
        ) === 0
          ? false
          : true,
    };
  } else {
    newFactura = Object.fromEntries(
      facturaMap 
    ) as RawFactura2;
    responseFactura = {
      facturaElectronica: qrString,
      CUFE              : newFactura.CUFE,
      secondaryFactura  : newFactura as JsonObject,
      fecha             : new Date(
        `${ newFactura.FecFac }T${ newFactura.HorFac }` 
      ),
      QRCode: newFactura.https
        ? `https://${ newFactura.https ?? newFactura.QRCode }`
        : `${ newFactura.QRCode }`,
      id          : newFactura.NumFac,
      valorBase   : newFactura.ValFac,
      valorIva    : newFactura.ValIva,
      valorOtroImp: newFactura.ValOtroIm,
      hasIva      : parseInt(
        newFactura.ValIva 
      ) === 0
        ? false
        : true,
      hasOtroImp: parseInt(
        newFactura.ValOtroIm 
      ) === 0
        ? false
        : true,
      hasIcui: parseInt(
        newFactura.ValOtroIm 
      ) === 0
        ? false
        : true,
      hasImpoConsumo: parseInt(
        newFactura.ValOtroIm 
      ) === 0
        ? false
        : true,
      nit: Number(
        newFactura.NitFac 
      ),
      valorTotal: newFactura.ValTolFac
        ? newFactura.ValTolFac
        : newFactura.ValFacIm
          ? newFactura.ValFacIm
          : `${
            parseFloat(
              newFactura.ValFac 
            )
              + parseFloat(
                newFactura.ValOtroIm 
              )
              + parseFloat(
                newFactura.ValIva 
              )
          }`,
    };
  }

  return responseFactura;
}
