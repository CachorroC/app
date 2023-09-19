'use client';

import { ChangeEventHandler, useState } from 'react';
import styles from './styles.module.css';
import { useContactContext } from '../../../app/context/main-context';

export default function Checkbox() {
  const [
    isChecked,
    setIsChecked
  ] = useState(
    false 
  );

  const {
    contactoForm, setContactoForm 
  } = useContactContext();

  const handleTextareaChange: ChangeEventHandler<HTMLInputElement> = (
    e 
  ) => {
    setContactoForm(
      {
        ...contactoForm,
        newsLetter: e.target.checked,
      } 
    );
    setIsChecked(
      e.target.checked 
    );
  };

  return (
    <label className={styles.switchBox}>
      <input
        className={styles.inputElement}
        checked={contactoForm.newsLetter}
        type="checkbox"
        onChange={handleTextareaChange}
      />
      <span className={styles.slider}></span>
    </label>
  );
}
