const { HttpStatus } = require("../../constants/https");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

const validationSchema = z.object({
  username: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8),
});

module.exports.SignIn = async (req, res) => {
  try {
    const validated = validationSchema.parse(req.body);

    // if (!validated.success) {
    //   return res.status(HttpStatus.BAD_REQUEST).json({
    //     message: "Invalid input data",
    //     data: validated.error,
    //   });
    // }

    const { email, phone, username } = req.body;

    let userExists = await User.findOne({
      $or: [{ email }, { phone }, { username }],
    });

    if (userExists) {
      const passwordCorrect = await bcrypt.compare(
        req.body.password,
        userExists.password
      );
      console.log("req body : ", req.body);
      console.log("passwordCorrect : ", passwordCorrect);
      if (!passwordCorrect) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: "Invalid password",
        });
      } else {
        return res.status(HttpStatus.OK).json({
          message: "Login success",
          data: userExists,
        });
      }
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error while signin",
      data: error,
    });
  }
};
