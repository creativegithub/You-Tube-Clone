import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedata = jwt.verify(token, process.env.JWT_SECERT);
    req.userId = decodedata?.id;
    next();
  } catch (error) {
    res.status(400).json("Invalid credentials...");
    return;
  }
};

export default auth;
