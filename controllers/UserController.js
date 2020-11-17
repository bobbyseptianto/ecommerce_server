const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {

  static async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const payload = {
        email,
        password
      };
      const user = await User.findOne({ where: {email: payload.email, role: "admin"} });
      if (!user) {
        throw { msg: `Authentication failed!`, status: 401 };
      } else if (!comparePassword(payload.password, user.password)) {
        throw { msg: `Invalid email or password!`, status: 401 };
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        });
        res.status(200).json({ id: user.id, email: user.email, access_token });
      }
    } catch (err) {
      next(err);
    }
  }

  static async registerCustomer(req, res, next) {
    try {
      const { email, password } = req.body;
      const payload = {
        email,
        password
      };
      const user = await User.create(payload);
      res.status(201).json({
        id: user.id,
        email: user.email
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;
      const payload = {
        email,
        password
      };
      const user = await User.findOne({ where: {email: payload.email, role: "customer"} });
      if (!user) {
        throw { msg: `Authentication failed!`, status: 401 };
      } else if (!comparePassword(payload.password, user.password)) {
        throw { msg: `Invalid email or password!`, status: 401 };
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        });
        res.status(200).json({ id: user.id, email: user.email, access_token });
      }
    } catch (err) {
      next(err);
    }
  }

}

module.exports = UserController;