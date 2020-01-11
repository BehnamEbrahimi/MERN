export default function(formData, schema) {
  const { error } = schema.validate(formData, { abortEarly: false });

  if (!error) return null;

  const errors = {};
  for (let item of error.details) {
    if (errors[item.path[0]]) {
      errors[item.path[0]].push(item.message);
    } else {
      errors[item.path[0]] = [item.message];
    }
  }

  return errors;
}
