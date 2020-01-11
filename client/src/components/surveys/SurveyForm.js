// SurveyForm shows a form for a user to add input
import React from 'react';
import { reduxForm, Field } from 'redux-form'; // redux-form is overkill for a simple form with few fields and a submit button (in that case, using local state for formData and error is recommended) but great for complex forms such as wizard forms (because in the next page we want to access the form data)
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateAgainstSchema from '../../utils/Joi/validateAgainstSchema';
import extractSchema from '../../utils/Joi/extractSchema';
import formFields from './formFields';

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  // handleSubmit is provided automathically by redux-form and it invokes its inner function (written by us) with all the form values
  return (
    <div>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        {formFields.map(({ label, name }) => (
          <Field
            key={name}
            name={name} // this is the name of the variable in the redux store+
            type="text"
            label={label} // each added props (like this one) to the Field component will automatically be forwarded to the component {SurveyField}
            component={SurveyField} // redux-form passes input object (which has a lot of event handlers: onBlur,...) and meta
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
  validate, // it is automatically ran with the form values whenever the form data is changed or form is going to be submitted. if this function responds with {"fieldName": ["error1", "error2"], ...}, it will update the meta for each field and ALSO PREVENTS THE EXECUTION OF THE FUNCTION PASSED TO THE handleSubmit
  form: 'surveyForm', // it creates a fraction of state with the key of this name to store form data
  destroyOnUnmount: false // when the user wants to review and then come backe, all the form values exist
})(SurveyForm);
