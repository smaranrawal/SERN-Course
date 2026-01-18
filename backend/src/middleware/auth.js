const { verifyToken } = require("../utils/auth");
const httpError = require("../utils/httpError");

const isProtectedRoute = (req, res, next) => {
  const { token } = req.cookies;
  console.log("TOKEN", token);
  if (!token) {
    return next(httpError("Unauthorized :Not token provided", 403));
  }

  const userData = verifyToken(token);

  if (!userData) {
    return next(httpError("Unvalid:Invalid Token", 403));
  }
  console.log("UserData from token ", userData);
  req.user = userData;
  next();
};

const isCustomer = (req, res, next) => {
  if (req.user.type !== "customer") {
    return next(
      httpError("Forbidden:Access is allowed for customers only"),
      403
    );
  }
  next();
};
const isVendor = (req, res, next) => {
  if (req.user.type !== "vendor") {
    return next(httpError("Forbidden:Access is allowed for vendors only"), 403);
  }
  next();
};

module.exports = {
  isProtectedRoute,
  isCustomer,
  isVendor,
};
