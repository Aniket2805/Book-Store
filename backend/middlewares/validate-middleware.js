const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    const message = "Fill in the required fields";
    const extraDetails = error.errors[0].message;
    const status = 400;
    const errorObj = { message, extraDetails, status };
    next(errorObj);
  }
};
export default validate;
