import ExtendedJoi from './ExtendedJoi';

export default function(formFields) {
  const joiSchema = {};

  formFields.forEach(({ name, schema }) => {
    joiSchema[name] = schema;
  });

  return ExtendedJoi.object(joiSchema);
}
