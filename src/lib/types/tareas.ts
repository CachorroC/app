export interface NewTask {
  carpetaNumero: number | null;
  content      : string[];
  done         : boolean;
  dueDate      : Date;
  text         : string;
}

export interface IntTask extends NewTask {
  id       : number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubTarea {
  date      : Date | null;
  id        : number;
  isComplete: boolean;
  tareaId   : number | null;
  text      : string;
}

export type SortActionType = {
  type      : 'sort';
  dir       : boolean;
  sortingKey:
    | 'carpetaNumero'
    | 'id'
    | 'dueDate'
    | 'createdAt'
    | 'text'
    | 'updatedAt';
};

export type UpdateActionType = {
  type: 'changed';
  task: IntTask;
};

export type DeleteActionType = {
  type: 'deleted';
  id  : number;
};

export type ResetActionType = {
  type   : 'reset';
  payload: IntTask[];
};

export type AddActiontype = {
  type: 'added';
  task: IntTask;
};

export interface IntTaskAction {
  type: 'added' | 'changed' | 'deleted';
  task: IntTask;
}

export type TaskAction =
  | AddActiontype
  | DeleteActionType
  | ResetActionType
  | UpdateActionType
  | SortActionType;

// Converts JSON strings to/from your types
export class tareaConvert {
  public static toTarea( json: string ): IntTask {
    return JSON.parse( json );
  }

  public static tareaToJson( value: IntTask ): string {
    return JSON.stringify( value );
  }

  public static toSubTarea( json: string ): SubTarea {
    return JSON.parse( json );
  }

  public static subTareaToJson( value: SubTarea ): string {
    return JSON.stringify( value );
  }
}
