import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';

const FormikContainer = () => {
  const dropdownOptions = [
    { key: 'select an option', value: '' },
    { key: 'Option 1', value: '1' },
    { key: 'Option 2', value: '2' },
    { key: 'Option 3', value: '3' },
  ];
  const radioOptions = [
    { key: 'Option 1', value: '1' },
    { key: 'Option 2', value: '2' },
    { key: 'Option 3', value: '3' },
  ];
  const checkboxOptions = [
    { key: 'Option 1', value: '1' },
    { key: 'Option 2', value: '2' },
    { key: 'Option 3', value: '3' },
  ];
  const initialValues = {
    email: '',
    description: '',
    selectOptions: '',
    radioOptions: '',
    checkboxOptions: [],
    birthDate: null,
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address!'),
    description: Yup.string().required('Description is required'),
    selectOptions: Yup.string().required('Select options is required'),
    radioOptions: Yup.string().required('radio options is required'),
    checkboxOptions: Yup.array().required('checkbox options is required'),
    birthDate: Yup.date().required('required').nullable(),
  });
  const onSubmit = (values) => console.log('Form data', values);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control='input'
            type='email'
            label='Email'
            name='email'
          />
          <FormikControl
            control='textarea'
            label='Description'
            name='description'
          />
          <FormikControl
            control='select'
            label='Select a topic'
            name='selectOptions'
            options={dropdownOptions}
          />
          <FormikControl
            control='radio'
            label='Radio topic'
            name='radioOptions'
            options={radioOptions}
          />
          <FormikControl
            control='checkbox'
            label='checkbox topic'
            name='checkboxOptions'
            options={checkboxOptions}
          />
          <FormikControl control='date' label='Pick a date' name='birthDate' />
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
