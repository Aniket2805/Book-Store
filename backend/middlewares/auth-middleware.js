import jwt from "jsonwebtoken";

const authMiddleware = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    request.user = decoded;
    next();
  } catch (error) {
    const status = 401;
    const message = "You are not authenticated";
    const extraDetails = "Failed to authenticate token";
    const errorObj = { message, status, extraDetails };
    next(errorObj);
  }
};
export default authMiddleware;
