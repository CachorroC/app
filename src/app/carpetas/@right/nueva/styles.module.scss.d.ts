export type Styles = {
  addButton: string;
  button: string;
  buttonsRow: string;
  buttonTextHelper: string;
  container: string;
  deleteButton: string;
  divider: string;
  editButton: string;
  form: string;
  homeButton: string;
  inputElement: string;
  label: string;
  section: string;
  selectArea: string;
  slider: string;
  submitButton: string;
  switchBox: string;
  textArea: string;
  title: string;
  titleInput: string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
