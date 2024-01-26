
import * as fs from 'fs/promises';

const personList = [
  `NumFac:W3571032918
FecFac:2023-02-05
HorFac:11:42:25-05:00
NitFac:890900943
DocAdq:900848824
ValFac:100605.05
ValIva:19115.00
ValOtroIm:0.00
ValTolFac:119720.00
CUFE:20302171605e68a45c72e6cd777755884546c2430cd6afaf12961fd466f3f9193cbc033880153323b4c66946cc3893d0
QRCode:https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=20302171605e68a45c72e6cd777755884546c2430cd6afaf12961fd466f3f9193cbc033880153323b4c66946cc3893d0`,
  'NumFac: AM3V158  FecFac: 2023-04-25  HorFac: 19:25:22-05:00  NitFac: 900121964  DocAdq: 222222222222  ValFac: 70215.55  ValIva: 0.00  ValOtroIm: 4244.45  ValTolFac: 74460.00  CUFE: 03ea91c4f1cce9b9cf6214e002c7138f3035dea5b814260d290b51e28ee109c71278d9108d6e69d899a6f550cdbd2a70  https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=03ea91c4f1cce9b9cf6214e002c7138f3035dea5b814260d290b51e28ee109c71278d9108d6e69d899a6f550cdbd2a70',
  `NumFac:X5531017133
FecFac:2023-10-07
HorFac:02:21:31-05:00
NitFac:890900943
DocAdq:900848824
ValFac:1270925.79
ValIva:184411.00
ValOtroIm:0.00
ValTolFac:1455335.00
CUFE:03cf72a7462e66b50c3eef28ea527025047c5d1645682d6421efcbfc0fbdfb35680c93320acef45feb7851354eab0fc0
QRCode:https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=03cf72a7462e66b50c3eef28ea527025047c5d1645682d6421efcbfc0fbdfb35680c93320acef45feb7851354eab0fc0`,
  `NumFac:W3851023784
FecFac:2022-07-24
HorFac:07:49:31-05:00
NitFac:890900943
DocAdq:19340939
ValFac:97183.20
ValIva:7217.00
ValOtroIm:0.00
ValTolFac:104400.00
CUFE:9d720f2fd10a411d1c30c06f7275aebfcd97bedd28bad54e04ea2c7535bbaa0df351146a264fe9f298f518d98b471c24
QRCode:https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=9d720f2fd10a411d1c30c06f7275aebfcd97bedd28bad54e04ea2c7535bbaa0df351146a264fe9f298f518d98b471c24`,
  `NumFac:X5361014859
FecFac:2023-07-28
HorFac:12:38:11-05:00
NitFac:890900943
DocAdq:900848824
ValFac:617267.96
ValIva:79540.00
ValOtroIm:1474.00
ValTolFac:698280.00
CUFE:96698ea284c5714198bc5dbb07d5d488ebdded41d5905387a5620278d7d386825ed770cedefd38f9f4f9d3215e14f2d6
QRCode:https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=96698ea284c5714198bc5dbb07d5d488ebdded41d5905387a5620278d7d386825ed770cedefd38f9f4f9d3215e14f2d6`,
  `NumFac:01E215725
FecFac:2023-11-16
HorFac:17:09:31
NitFac:830037946
DocAdq:900848824
ValFac:20504
ValIva:3896
ValOtroIm:0
ValFacIm:24400
CUFE:721311b04e1df69da45e23a58e4ea85516459d37f405ea3b51730a7ec5b3184fa700ead5e1254e1777ce3141b2389cd1
QRCode:https://catalogo-vpfe.dian.gov.c`,
  `NumFac:W3591050234
FecFac:2023-01-20
HorFac:05:48:50-05:00
NitFac:890900943
DocAdq:900848824
ValFac:167983.19
ValIva:31917.00
ValOtroIm:0.00
ValTolFac:199900.00
CUFE:c66f62430562faa2367034a0b533bac6b4d48f89c6b6a319d9d6746451712d023434062d0626e5fa436690dd792fb0b4
QRCode:https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=c66f62430562faa2367034a0b533bac6b4d48f89c6b6a319d9d6746451712d023434062d0626e5fa436690dd792fb0b4`,
  'NroFactura=6303100231561 NitFacturador=800242106 NitAdquiriente=900848824 FechaFactura=2023-07-22 HoraFactura=04:50:56-05:00 ValorFactura=31764.71 ValorIVA=6035.29 ValorOtrosImpuestos=0.00 ValorTotalFactura=37800.00 CUFE=https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=2cc4e0876692693526863d7ce389611ae93efd210546cb3f1a00188c7e1fa4240691fe96069eb5d1f8a4ffdb7b7e330a',
  'NumFac: FEAK28  FecFac: 2023-08-10  HorFac: 10:42:51-05:00  NitFac: 860508791  DocAdq: 900844437  ValFac: 31764.71  ValIva: 6035.29  ValOtroIm: 0.00  ValTolFac: 37800.00  CUFE: f299aa0ef680f9bf59bfd0d1c8e11004ff9c27950aba59d02aa1609f11aa0ecc94bdc21364f94c67cd4890f80e5dd046  https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=f299aa0ef680f9bf59bfd0d1c8e11004ff9c27950aba59d02aa1609f11aa0ecc94bdc21364f94c67cd4890f80e5dd046',
  `NumFac:W3851023784
FecFac:2022-07-24
HorFac:07:49:31-05:00
NitFac:890900943
DocAdq:19340939
ValFac:97183.20
ValIva:7217.00
ValOtroIm:0.00
ValTolFac:104400.00
CUFE:9d720f2fd10a411d1c30c06f7275aebfcd97bedd28bad54e04ea2c7535bbaa0df351146a264fe9f298f518d98b471c24
QRCode:https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=9d720f2fd10a411d1c30c06f7275aebfcd97bedd28bad54e04ea2c7535bbaa0df351146a264fe9f298f518d98b471c24`,
  'NumFac: AM3V158  FecFac: 2023-04-25  HorFac: 19:25:22-05:00  NitFac: 900121964  DocAdq: 222222222222  ValFac: 70215.55  ValIva: 0.00  ValOtroIm: 4244.45  ValTolFac: 74460.00  CUFE: 03ea91c4f1cce9b9cf6214e002c7138f3035dea5b814260d290b51e28ee109c71278d9108d6e69d899a6f550cdbd2a70  https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=03ea91c4f1cce9b9cf6214e002c7138f3035dea5b814260d290b51e28ee109c71278d9108d6e69d899a6f550cdbd2a70',
  `NumFac:X5521019676
FecFac:2023-11-25
HorFac:11:48:04-05:00
NitFac:890900943
DocAdq:900844437
ValFac:957900.00
ValIva:0.00
ValOtroIm:0.00
ValTolFac:957900.00
CUFE:7eab45c0b4ccbf0a242ce68491d648c03a0279c12d35fc11bfe9c2e108604070b14fc2c73b98230e18a27c832b5b7b1d
QRCode:https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=7eab45c0b4ccbf0a242ce68491d648c03a0279c12d35fc11bfe9c2e108604070b14fc2c73b98230e18a27c832b5b7b1d`,
  'NumFac:AM3V158  FecFac:2023-04-25  HorFac:19:25:22-05:00  NitFac:900121964  DocAdq:222222222222  ValFac:70215.55  ValIva:0.00  ValOtroIm:4244.45  ValTolFac:74460.00  CUFE:03ea91c4f1cce9b9cf6214e002c7138f3035dea5b814260d290b51e28ee109c71278d9108d6e69d899a6f550cdbd2a70  QRCode:https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=03ea91c4f1cce9b9cf6214e002c7138f3035dea5b814260d290b51e28ee109c71278d9108d6e69d899a6f550cdbd2a70',
  'NumFac: AM3V158  FecFac: 2023-04-25  HorFac: 19:25:22-05:00  NitFac: 900121964  DocAdq: 222222222222  ValFac: 70215.55  ValIva: 0.00  ValOtroIm: 4244.45  ValTolFac: 74460.00  CUFE: 03ea91c4f1cce9b9cf6214e002c7138f3035dea5b814260d290b51e28ee109c71278d9108d6e69d899a6f550cdbd2a70  https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=03ea91c4f1cce9b9cf6214e002c7138f3035dea5b814260d290b51e28ee109c71278d9108d6e69d899a6f550cdbd2a70',
  `NumFac:X9471000177
FecFac:2023-04-01
HorFac:10:49:21-05:00
NitFac:890900943
DocAdq:900848824
ValFac:212285.71
ValIva:40335.00
ValOtroIm:0.00
ValTolFac:252620.00
CUFE:898ff45412ef27934237efa52152be96bb9ff31d7b17eb801342e8de6efc9f386d7588bd62ada1366b55956b0df1de4c
QRCode:https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=898ff45412ef27934237efa52152be96bb9ff31d7b17eb801342e8de6efc9f386d7588bd62ada1366b55956b0df1de4c`,
  `NumFac=F433129
FecFac=2023-05-01
HorFac=14:15:28-05:00
NitFac=900943243
DocAdq=900848824
ValFac=38655.45
ValIva=7344.55
ValOtroIm=0.00
ValTolFac=46050.00
CUFE=b311e96e4f9533a94473c4a1ae359b590f488e9219a2004a593f58068237a10a1a6ef389396083987599b51bf208883e
QRCode=https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=b311e96e4f9533a94473c4a1ae359b590f488e9219a2004a593f58068237a10a1a6ef389396083987599b51bf208883e`,
  'NroFactura=6311100232865 NitFacturador=800242106 NitAdquiriente=900848824 FechaFactura=2023-07-23 HoraFactura=04:44:58-05:00 ValorFactura=77142.86 ValorIVA=14657.14 ValorOtrosImpuestos=0.00 ValorTotalFactura=91800.00 CUFE=https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=6b6c8d79c3507d49dc7d66ccd1d79ccfffcdc8e5a34d9b0f0303a33630fef30c0c64575c7b985156f5f6e9581b5e0026',
  'NroFactura=6305100235429 NitFacturador=800242106 NitAdquiriente=900848824 FechaFactura=2023-05-01 HoraFactura=01:30:09-05:00 ValorFactura=94873.95 ValorIVA=18026.05 ValorOtrosImpuestos=0.00 ValorTotalFactura=112900.00 CUFE=https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=61c4efd31c194142d86cd660c6bdb3eb93191854db87364f487e147ad6155424a203564306e6a923845c10082aa334dc',
  'NroFactura=6305100235429 NitFacturador=800242106 NitAdquiriente=900848824 FechaFactura=2023-05-01 HoraFactura=01:30:09-05:00 ValorFactura=94873.95 ValorIVA=18026.05 ValorOtrosImpuestos=0.00 ValorTotalFactura=112900.00 CUFE=https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=61c4efd31c194142d86cd660c6bdb3eb93191854db87364f487e147ad6155424a203564306e6a923845c10082aa334dc'
];

const regexpNames = /([a-z0-9A-Z_]+)(?::|=)(['\s"])?([a-z0-9A-Z_:\-./?=]+)(['\s\n"])?/gm;



const defpersonsList = personList.map(
  (
    person
  ) => {




            const facturaMap = new Map();

            const firstMatcher = person.matchAll(
              regexpNames
            );

            for ( const matchedKeyValues of firstMatcher ) {
              console.log(
                matchedKeyValues
              );
              facturaMap.set(
                matchedKeyValues[ 1 ], matchedKeyValues[ 3 ]
              );
            }

            return Object.fromEntries(
              facturaMap
            );
  }
);

for ( const lsp of defpersonsList ) {
  console.log(
    lsp
  );
}

fs.writeFile(
  'facturas.json', JSON.stringify(
    defpersonsList
  )
);