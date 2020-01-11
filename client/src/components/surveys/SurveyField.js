// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, meta: { error: errors, touched }, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {errors && touched && errors.map(error => <p key={error}>{error}</p>)}
      </div>
    </div>
  );
};
