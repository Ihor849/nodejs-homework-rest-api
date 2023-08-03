const { HttpError, nodEmailer } = require("../../helpers");
const { User } = require("../../models/user");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Clic verify</a>`,
  };
  await nodEmailer(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

module.exports = resendVerifyEmail;
