export const checkUserAuthDto = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ status: 400, message: "Email and password are required" });
  }
  if (!email.includes("@")) {
    return next({ status: 400, message: "Email must be valid" });
  }
  if (password.length < 6) {
    return next({
      status: 400,
      message: "Password must be at least 6 characters",
    });
  }
  next();
};
