export type Styles = {
  active: string;
  addButton: string;
  button: string;
  buttonsRow: string;
  buttonTextHelper: string;
  checkbox: string;
  checkboxItem: string;
  container: string;
  content: string;
  deleteButton: string;
  editButton: string;
  form: string;
  homeButton: string;
  innactive: string;
  label: string;
  nota: string;
  section: string;
  select: string;
  selectArea: string;
  slider: string;
  submitButton: string;
  switchBox: string;
  tareas: string;
  textArea: string;
  title: string;
  titleInput: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
