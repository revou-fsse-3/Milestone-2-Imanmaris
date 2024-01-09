
import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const CreateCategorySchema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
});