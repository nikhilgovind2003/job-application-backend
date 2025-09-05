// controller for user login
import { userModel } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// register user
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for user email and password
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find single user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401);
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password; // Remove password from user object
    delete userWithoutPassword._id; // Remove _id from user object


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401);
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (isMatch) {
      const token = generateToken(user._id);
      return res.status(200).json({
        success: true,
        token,
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
