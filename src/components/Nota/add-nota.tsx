'use client';
import { createNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { useState } from 'react';
import styles from '../form/checkbox/styles.module.css';

export default function AddTask () {
      const [
        hasContent,
        setHasContent
      ] = useState(
        false
      );

      const {
        inputNota, setInputNota
      } = useNotaContext();

      return (
        <form action={createNota}>
          <input
            placeholder="Add task"
            value={inputNota.title}
            type="text"
            name="title"
            onChange={(
              e 
            ) => {
                      return setInputNota(
                        (
                          nn 
                        ) => {
                                  return {
                                    ...nn,
                                    title: e.target.value,
                                  };
                        } 
                      );
            }}
          />

          <input
            placeholder={'fecha de entrega'}
            type={'date'}
            onChange={(
              e 
            ) => {
                      return setInputNota(
                        {
                          ...inputNota,
                          date: new Date(
                            e.target.value 
                          ),
                        } 
                      );
            }}
            value={inputNota.date.toString()}
          />

          <label className={styles.switchBox}>
            <input
              className={styles.inputElement}
              type="checkbox"
              checked={hasContent}
              onChange={() => {
                        setHasContent(
                          (
                            n 
                          ) => {
                                    return !n;
                          } 
                        );
              }}
            />
            <span className={styles.slider}></span>
          </label>
          <button type="submit">Add</button>
        </form>
      );
}
