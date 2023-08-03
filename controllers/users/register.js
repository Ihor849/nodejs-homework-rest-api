const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError,  nodEmailer } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;


// signup
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const verificationCode = nanoid();

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email)

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Clic verify</a>`,
  };
  await nodEmailer(verifyEmail);
  
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;

