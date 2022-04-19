import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        rej(err);
      } else {
        res(decoded);
      }
    });
  });
};

export const checkToken = (req, res, next) => {
  const token = req?.headers["authorization"]?.trim()?.slice("Bearer ".length);
  verifyToken(token)
    .then(() => next())
    .catch((e) => next({ code: 401, details: e.message }));
};
