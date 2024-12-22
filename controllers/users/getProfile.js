const { HttpStatus } = require("../../constants/https");
const User = require("../../models/user");

module.exports.getProfile = async (req, res) => {
  try {
    const profileId = req.params.id;

    const user = await User.findById(profileId);
    if (!user) {
      res.status(HttpStatus.NOT_FOUND).send({ messag: "User not found" });
    }

    res.status(HttpStatus.OK).send({ message: "Profile details", data: user });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error while fetching profile details",
      data: error,
    });
  }
};
