const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    return res.status(400).send({ message: error.errors[0].message });
  }
};
export default validate;
