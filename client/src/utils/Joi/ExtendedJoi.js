const Joi = require('@hapi/joi');

export const listOfEmails = joi => {
  return {
    type: 'listOfEmails',
    base: joi.string().required(),
    messages: {
      'listOfEmails.base': '{{#label}} must contain valid emails'
    },
    validate(value, helpers) {
      const invalidEmails = value
        .split(',')
        .map(email => email.trim())
        .filter(email => {
          const { error } = Joi.string()
            .email({
              minDomainSegments: 2,
              tlds: { allow: ['com', 'net'] }
            })
            .validate(email);
          if (error) return true;
        });

      if (invalidEmails.length) {
        return { value, errors: helpers.error('listOfEmails.base') };
      }
    }
  };
};

export default Joi.extend(listOfEmails);
