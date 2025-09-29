'use client';

import { ChangeEvent, useState } from 'react';
import styles from './form.module.css';

export const ParseTextarea = (
  {
    value = [],
    onChange,
  }: {
    value: any[];
    onChange: any;
  } 
) => {
  const [
    text,
    setText
  ] = useState<string>(
    value.join(
      '\n' 
    ) 
  );

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement> 
  ) => {
    const {
      value 
    } = e.target;

    setText(
      value 
    );
    onChange(
      value.split(
        '\n' 
      ) 
    );
  };

  return (
    <textarea
      className={styles.textArea}
      onChange={handleChange}
      value={text}
    />
  );
};
