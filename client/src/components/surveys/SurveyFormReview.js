// SurveyFormReview shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import { submitSurvey } from '../../actions/surveyActions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {formFields.map(({ name, label }) => {
        return (
          <div key={name}>
            <label>{label}</label>
            <div>{formValues[name]}</div>
          </div>
        );
      })}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, { submitSurvey })(
  withRouter(SurveyFormReview)
);
