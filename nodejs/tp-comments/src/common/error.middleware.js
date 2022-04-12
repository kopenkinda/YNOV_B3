export const errorMiddleware = (error, request, response, next) => {
  const code = error.code || 500;
  response.status(error.code || 500);
  response.json({
    code,
    timestamp: new Date().toISOString(),
    details: error?.details,
    message: error?.message,
  });
};
