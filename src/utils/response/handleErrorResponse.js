import httpStatus from 'http-status';

const handleErrorResponse = (res, error) => {
  const { status = httpStatus.INTERNAL_SERVER_ERROR, message: pesan } = error;
  res.status(status).json({ error: { pesan } });
};

export default handleErrorResponse;
