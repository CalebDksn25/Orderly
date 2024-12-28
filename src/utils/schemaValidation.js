import Ajv from 'ajv';

const ajv = new Ajv();

export const validateSchema = (data, schema) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
    return false;
  }

  return true;
};
