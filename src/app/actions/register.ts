'use server';
import prisma from '#@/lib/connection/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object(
  {
    email: z.string()
      .email(),
    password: z.string()
      .min(
        6
      ),
    name: z.string()
      .min(
        2
      ),
  }
);

export async function registerUser(
  formData: FormData
) {
  const formEmail = formData.get(
    'email'
  );
  const formPassword = formData.get(
    'password'
  );
  const formName = formData.get(
    'name'
  );

  if ( !formEmail && !formPassword && !formName ) {
    return {
      error: `no email, password or name provided. ${ formEmail } ${ formPassword } ${ formName }`
    };
  }

  const email = String(
    formEmail 
  );

  const name = String(
    formName 
  );
  const password = String(
    formPassword 
  );

  // Validate data
  const validatedFields = registerSchema.safeParse(
    {
      email,
      password,
      name
    }
  );

  if ( !validatedFields.success ) {
    return {
      error: 'Invalid fields'
    };
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique(
    {
      where: {
        email
      },
    }
  );

  if ( existingUser ) {
    return {
      error: 'Email already in use'
    };
  }

  // Hash password & Create User
  const hashedPassword = await bcrypt.hash(
    password, 10
  );

  await prisma.user.create(
    {
      data: {
        email,
        name,
        password: hashedPassword,
      },
    }
  );

  return {
    success: 'User created!'
  };
}