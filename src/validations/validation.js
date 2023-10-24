import ResponseError from '../utils/error/response.error.js';

const validate = (schema, request) => {
  const result = schema.validate(request);
  if (result.error) {
    throw new ResponseError(result.error.message, 400);
  }
  return result.value;
};

export const validateAsync = async (schema, request) => {
  try {
    const result = await schema.validateAsync(request);
    return result;
  } catch (error) {
    throw new ResponseError(error.message, 400);
  }
};

export default validate;
