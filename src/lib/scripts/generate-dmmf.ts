import pkg from '@prisma/internals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Destructure getDMMF from the default import
const {
  getDMMF 
} = pkg;

// 2. Recreate __dirname for ES Modules
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

async function main() {
  // 3. Adjust paths to traverse up from src/lib/scripts to the root app directory
  const schemaPath = path.join(
    __dirname, '../../../prisma/schema.prisma' 
  );
  const outputPath = path.join(
    __dirname, '../../../prisma/dmmf.json' 
  );

  // Read the raw schema file
  const schema = fs.readFileSync(
    schemaPath, 'utf-8' 
  );

  // Use Prisma's internal parser to generate the AST
  const dmmf = await getDMMF( {
    datamodel: schema 
  } );

  // Save the datamodel portion to a JSON file
  fs.writeFileSync(
    outputPath, JSON.stringify(
      dmmf.datamodel, null, 2 
    ) 
  );

  console.log( '✅ DMMF successfully generated to prisma/dmmf.json' );
}

main()
  .catch( console.error );