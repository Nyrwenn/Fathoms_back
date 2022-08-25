const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({
      admin: req.body.admin,
    });

    if (admin) {
      throw new Error("This admin already exists !");
    }

    // if (email) {
    //   throw new Error("This email already exists !");
    // }

    const hash = await bcrypt.hash(req.body.password, 10);
    const adminGlobal = await Admin.create({
      admin: req.body.admin,
      //   email: req.body.email,
      password: hash,
    });

    adminGlobal.save();
    res.status(201).json({ message: "Admin created !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.login = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({
      admin: req.body.admin,
    });

    if (!admin) {
      throw new Error("Wrong admin !");
    }

    const compare = await bcrypt.compare(req.body.password, admin.password);

    if (!compare) {
      throw new Error("Wrong password !");
    }

    return res.status(200).json({
      admin: admin.id,
      token: jwt.sign({ admin: admin.id }, process.env.PassJWT),
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error });
  }
};

exports.me = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.PassJWT);
    const adminId = decodedToken.admin;

    const admin = await Admin.findOne({ id: adminId });

    if (!adminId) {
      throw new Error("Bad token !");
    }

    if (!admin) {
      throw new Error("Admin not found !");
    }

    return res.status(200).json({
      admin: admin.id,
      token: jwt.sign({ admin: admin.id }, process.env.PassJWT),
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error });
  }
};
