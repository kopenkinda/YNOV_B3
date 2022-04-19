import jwt from "jsonwebtoken";

const verifyTokenValidity = (token) => {
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

export const checkToken = (allowGuests = false) => {
  return (req, res, next) => {
    if (allowGuests) {
      return next();
    }
    const token = req?.headers["authorization"]
      ?.trim()
      ?.slice("Bearer ".length);
    verifyTokenValidity(token)
      .then((decoded) => {
        req.user = decoded;
        next();
      })
      .catch((e) => next({ status: 401, message: e.message }));
  };
};

export const allowedRoles = (roles) => {
  return (req, res, next) => {
    if (roles.includes("guest")) {
      return next();
    }
    if (roles.includes(req.user.role)) {
      return next();
    }
    return next({ status: 403, message: "Forbidden" });
  };
};

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};
