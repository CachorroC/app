export type APISchema = {
  models: Model[];
}

export type Model = {
  name         : string;
  dbName       : null;
  schema       : null;
  fields       : Field[];
  primaryKey   : PrimaryKey | null;
  uniqueFields : any[];
  uniqueIndexes: any[];
  isGenerated  : boolean;
}

export type Field = {
  name               : string;
  kind               : Kind;
  isList             : boolean;
  isRequired         : boolean;
  isUnique           : boolean;
  isId               : boolean;
  isReadOnly         : boolean;
  hasDefaultValue    : boolean;
  type               : string;
  nativeType         : Array<any[] | string> | null;
  isGenerated        : boolean;
  isUpdatedAt        : boolean;
  default?           : boolean | DefaultClass | number | string;
  relationName?      : string;
  relationFromFields?: string[];
  relationToFields?  : string[];
}

export type DefaultClass = {
  name: string;
  args: number[];
}

export type Kind = 'scalar' | 'enum' | 'object';

export type PrimaryKey = {
  name  : null;
  fields: string[];
}
