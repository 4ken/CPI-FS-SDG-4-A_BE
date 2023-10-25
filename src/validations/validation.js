import httpStatus from 'http-status';
import ResponseError from '../utils/error/responseError.js';

const validate = (schema, request) => {
  const result = schema.validate(request);
  if (result.error) {
    throw new ResponseError(result.error.message, httpStatus.BAD_REQUEST);
  }
  return result.value;
};

export const validateAsync = async (schema, request) => {
  try {
    const result = await schema.validateAsync(request);
    return result;
  } catch (error) {
    throw new ResponseError(error.message, httpStatus.BAD_REQUEST);
  }
};

export default validate;
