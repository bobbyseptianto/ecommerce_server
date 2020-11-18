const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authenticationAdmin(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { msg: `Authentication failed!`, status: 401 };
    } else {
      const decoded = verifyToken(access_token);
      const { email } = decoded;
      const user = await User.findOne({ where: {email, role: 'admin'} });
      if (!user) {
        throw { msg: `Authentication failed!`, status: 401 };
      } else {
        req['userLoggedIn'] = decoded;
        req.userLoggedIn['role'] = user.role;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

async function authenticationCustomer(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { msg: `Authentication failed!`, status: 401 };
    } else {
      const decoded = verifyToken(access_token);
      const { email } = decoded;
      const user = await User.findOne({ where: {email, role: 'customer'} });
      if (!user) {
        throw { msg: `Authentication failed!`, status: 401 };
      } else {
        req['userLoggedIn'] = decoded;
        req.userLoggedIn['role'] = user.role;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {authenticationAdmin, authenticationCustomer};