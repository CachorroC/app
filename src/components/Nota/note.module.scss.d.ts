export type Styles = {
  active: string;
  addButton: string;
  button: string;
  buttonAdd: string;
  buttonDelete: string;
  buttonEdit: string;
  buttonsRow: string;
  buttonTextHelper: string;
  checkboxItem: string;
  container: string;
  content: string;
  deleteButton: string;
  form: string;
  homeButton: string;
  icon: string;
  innactive: string;
  inputElement: string;
  label: string;
  nota: string;
  round: string;
  section: string;
  select: string;
  slider: string;
  sub: string;
  submitButton: string;
  sup: string;
  switchBox: string;
  tareas: string;
  task: string;
  taskContainer: string;
  taskList: string;
  textArea: string;
  titleInput: string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
