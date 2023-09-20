'use client';
import * as React from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
type FormValues = {
  firstName: string;
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};
let renderCount = 0;

const Total = (
    {
                    control 
    }: { control: Control<FormValues> } 
) => {
      const formValues = useWatch(
                  {
                                  name: 'cart',
                                  control,
                  } 
      );

      const total = formValues.reduce(
                  (
                      acc, current 
                  ) => {
                        return acc + ( current.price || 0 ) * ( current.quantity || 0 );
                  }, 0 
      );

      return <p>Total Amount: {total}</p>;
};

export default function Costos() {
  const {
                  register,
                  control,
                  handleSubmit,
                  formState: {
                                  errors 
                  },
  } = useForm<FormValues>(
              {
                              defaultValues: {
                                              cart: [
                                                      {
                                                                      name    : 'test',
                                                                      quantity: 1,
                                                                      price   : 23000,
                                                      },
                                              ],
                              },
                              mode: 'onBlur',
              } 
  );

  const {
                  fields, append, remove 
  } = useFieldArray(
              {
                              name: 'cart',
                              control,
              } 
  );

  const onSubmit = (
      data: FormValues 
  ) => {
        return console.log(
                    data 
        );
  };
  renderCount++;

  return (
    <div>
      <form onSubmit={handleSubmit(
                  onSubmit 
      )}>
        <input
          {...register(
                      'firstName' 
          )}
          placeholder="First Name"
        />
        {fields.map(
                    (
                        field, index 
                    ) => {
                          return (
                            <div key={field.id}>
                              <section
                                className={'section'}
                                key={field.id}
                              >
                                <input
                                  placeholder="name"
                                  {...register(
 `cart.${ index }.name` as const, {
                 required: true,
 } 
                                  )}
                                  className={errors?.cart?.[ index ]?.name
                                    ? 'error'
                                    : ''}
                                  defaultValue={field.name}
                                />
                                <input
                                  placeholder="quantity"
                                  type="number"
                                  {...register(
 `cart.${ index }.quantity` as const, {
                 valueAsNumber: true,
                 required     : true,
 } 
                                  )}
                                  className={errors?.cart?.[ index ]?.quantity
                                    ? 'error'
                                    : ''}
                                  defaultValue={field.quantity}
                                />
                                <input
                                  placeholder="value"
                                  type="number"
                                  {...register(
 `cart.${ index }.price` as const, {
                 valueAsNumber: true,
                 required     : true,
 } 
                                  )}
                                  className={errors?.cart?.[ index ]?.price
                                    ? 'error'
                                    : ''}
                                  defaultValue={field.price}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                        return remove(
                                                    index 
                                        );
                                  }}
                                >
                  DELETE
                                </button>
                              </section>
                            </div>
                          );
                    } 
        )}
        <Total control={control} />
        <button
          type="button"
          onClick={() => {
                return append(
                            {
                                            name    : '',
                                            quantity: 0,
                                            price   : 0,
                            } 
                );
          }}
        >
          APPEND
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
