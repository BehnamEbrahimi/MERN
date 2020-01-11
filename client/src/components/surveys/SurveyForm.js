// SurveyForm shows a form for a user to add input
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateAgainstSchema from '../../utils/Joi/validateAgainstSchema';
import extractSchema from '../../utils/Joi/extractSchema';
import formFields from './formFields';

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {formFields.map(({ label, name }) => (
          <Field
            key={name}
            name={name}
            label={label}
            type="text"
            component={SurveyField}
          />
        ))}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

const validate = formData => {
  const schema = extractSchema(formFields);

  return validateAgainstSchema(formData, schema);
};

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
