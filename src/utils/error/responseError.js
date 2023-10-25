class ResponseError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ResponseError';
    this.status = status;
  }
}

export default ResponseError;
