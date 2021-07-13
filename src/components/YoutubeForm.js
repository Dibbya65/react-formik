import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

const YoutubeForm = () => {
  const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
      facebook: '',
      twitter: '',
    },
    phone: ['', ''],
    pnumbers: [''],
  };
  const onSubmit = (values, onSubmitProps) => {
    console.log(values);
    console.log(onSubmitProps);
    onSubmitProps.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('This field is required'),
    channel: Yup.string().required('This field is required'),
    // comments: Yup.string().required('This field is required'),
  });
  const validateComments = (value) => {
    let error;
    if (!value) {
      error = 'This field is required';
    }
    return error;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnChange={false}
      // validateOnMount
    >
      {(formik) => {
        return (
          <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name</label>
              <Field type='text' id='name' name='name' />
              <ErrorMessage
                className='error'
                name='name'
                component={TextError}
              />
            </div>
            <div className='form-control'>
              <label htmlFor='email'>Email</label>
              <Field type='text' id='email' name='email' />
              <ErrorMessage className='error' name='email'>
                {(errorMsg) => <div className='error'>{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className='form-control'>
              <label htmlFor='channel'>Channel</label>
              <Field type='text' id='channel' name='channel' />
              <ErrorMessage
                className='error'
                name='channel'
                component={TextError}
              />
            </div>
            <div className='form-control'>
              <label htmlFor='comments'>Comments</label>
              <Field
                as='textarea'
                id='comments'
                name='comments'
                validate={validateComments}
              />
              <ErrorMessage
                className='error'
                name='comments'
                component={TextError}
              />
            </div>
            <div className='form-control'>
              <label htmlFor='address'>Address</label>
              <FastField name='address'>
                {(props) => {
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input type='text' id='address' {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>
            <div className='form-control'>
              <label htmlFor='facebook'>Facebook</label>
              <Field type='text' id='facebook' name='social.facebook' />
              <label htmlFor='twitter'>Twitter</label>
              <Field type='text' id='twitter' name='social.twitter' />
            </div>
            <div className='form-control'>
              <label htmlFor='phone1'>Primary Phone</label>
              <Field type='text' id='phone[0]' name='phone1' />
              <label htmlFor='phone2'>Secondary Phone</label>
              <Field type='text' id='phone2' name='phone[1]' />
            </div>
            <div className='form-control'>
              <label htmlFor='pnumbers'>List of phone number</label>
              <FieldArray name='pnumbers' id='pnumbers'>
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { pnumbers } = values;
                  return (
                    <div>
                      {pnumbers.map((item, index) => (
                        <div key={index}>
                          <Field name={`pnumbers[${index}]`} />
                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                          <button
                            type='button'
                            onClick={() => {
                              push('');
                            }}
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <button
              type='button'
              onClick={() => formik.validateField('comments')}
            >
              Validate comments
            </button>
            <button type='button' onClick={() => formik.validateForm()}>
              Validate all
            </button>
            {/* <button type='submit' disabled={!(formik.dirty && formik.isValid)}>
              Submit
            </button> */}
            <button type='submit' disabled={formik.isSubmitting}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YoutubeForm;
