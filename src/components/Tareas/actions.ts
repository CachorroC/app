'use server';

import { prisma } from '#@/lib/connection/prisma';
import { ZodTaskElementSchema } from './zod';
/*
export async function createUser(
  currentState: {success: boolean; message: string}, formData: FormData
): Promise<{ success: boolean; message: string; }> {

      try {

        const objectOfFormData = Object.fromEntries(
          formData.entries()
        );

        const inserter = await insertObjectofChristmas(
          objectOfFormData
        );

        if ( !inserter ) {
          throw new Error(
            'no se pudoo insertar la tarea a prisma'
          );

        }

        return {
          success: true,
          message: `tarea numero ${ inserter.id }`
        };

      } catch ( error ) {
        console.log(
          error
        );
        return {
          success: false,
          message: JSON.stringify(
            error, null, 2
          )
        };
      }
}
 */

export async function createUser(
  formData: FormData
) {
      const objectOfFormData = Object.fromEntries(
        formData.entries()
      );

      const validatedFields = ZodTaskElementSchema.safeParse(
        objectOfFormData
      );

      if ( !validatedFields.success ) {
        throw new Error(
          `${ JSON.stringify(
            validatedFields.error.flatten().fieldErrors, null, 2
          ) }`,
        );
      }

      const {
        data
      } = validatedFields;

      const inserter = await prisma.task.create(
        {
          data: {
            text         : data.text,
            done         : data.done,
            content      : data.content,
            dueDate      : data.dueDate,
            carpetaNumero: data.carpetaNumero,
          },
        }
      );
      return inserter;
}

export async function deleteTask(
  {
    id
  }: { id: number }
) {
      const deleter = await prisma.task.delete(
        {
          where: {
            id: id,
          },
        }
      );

      return deleter;
}

export async function editTask(
  formData: FormData
) {
      const objectOfFormData = Object.fromEntries(
        formData.entries()
      );

      const validatedFields = ZodTaskElementSchema.safeParse(
        objectOfFormData
      );

      if ( !validatedFields.success ) {
        throw new Error(
          `${ JSON.stringify(
            validatedFields.error.flatten().fieldErrors, null, 2
          ) }`,
        );
      }

      const {
        data
      } = validatedFields;

      const inserter = await prisma.task.upsert(
        {
          where: {
            id: data.id ?? undefined,
          },
          create: {
            text         : data.text,
            done         : data.done,
            content      : data.content,
            dueDate      : data.dueDate,
            carpetaNumero: data.carpetaNumero,
          },
          update: {
            text         : data.text,
            done         : data.done,
            content      : data.content,
            dueDate      : data.dueDate,
            carpetaNumero: data.carpetaNumero,
          },
        }
      );
      return inserter;
}