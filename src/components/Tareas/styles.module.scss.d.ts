export type Styles = {
  button: string;
  buttonsRow: string;
  container: string;
  form: string;
  icon: string;
  inputElement: string;
  label: string;
  selectArea: string;
  slider: string;
  submitButton: string;
  switchBox: string;
  tableHeader: string;
  text: string;
  textArea: string;
  title: string;
  titleInput: string;
  vencimientoArea: string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
