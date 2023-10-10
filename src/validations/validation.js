import ResponseError from '../utils/error/response.error.js';

const validate = (schema, request) => {
  const result = schema.validate(request);
  if (result.error) {
    throw new ResponseError(result.error.message, 400);
  }
  return result.value;
};

export default validate;
