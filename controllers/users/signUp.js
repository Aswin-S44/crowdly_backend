const { HttpStatus } = require("../../constants/https");
const User = require("../../models/user");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const validationSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  phone: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  profilePicture: z.string().url().optional(),
  bio: z.string().max(160).optional(),
  privateAccount: z.boolean().optional(),
  interests: z.array(z.string()).optional(),
});

module.exports.SignUp = async (req, res) => {
  try {
    const validated = validationSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Invalid input data",
        data: validated.error,
      });
    }

    const { email, phone, username } = req.body;

    let userExists = await User.findOne({
      $or: [{ email }, { phone }, { username }],
    });

    if (userExists) {
      return res.status(HttpStatus.CONFLICT).json({
        message: "User already exists",
      });
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    const token = jwt.sign({ username, email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    req.body.password = hashedPassword;
    req.body.token = token;

    await User.create(req.body);

    const createdUser = await User.findOne({ email });

    return res.status(HttpStatus.OK).json({
      message: "Account created successfully",
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error while creating account",
      data: error,
    });
  }
};
