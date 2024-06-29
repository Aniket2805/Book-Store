import jwt from "jsonwebtoken";

const authMiddleware = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(401).send({ message: "Unauthorized Token" });
  }
};
export default authMiddleware;
