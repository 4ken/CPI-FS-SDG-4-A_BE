import httpStatus from 'http-status';
import ResponseError from '../utils/error/responseError.js';

const validate = (schema, request) => {
  const result = schema.validate(request);
  if (result.error) {
    throw new ResponseError(result.error.message, httpStatus.BAD_REQUEST);
  }
  return result.value;
};

export default validate;
