const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verficationCode } = req.params;
  const user = await User.findOne({ verficationCode });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verficationCode: "" });

  res.json({
    message: "Email verify success",
  });
};
module.exports = verifyEmail;
