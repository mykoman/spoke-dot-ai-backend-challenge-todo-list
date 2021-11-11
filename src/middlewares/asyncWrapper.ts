export default (wrapFunction) => async (request, response, next) => {
  try {
    await wrapFunction(request, response, next);
  } catch (error) {
    return next(error);
  }
};
