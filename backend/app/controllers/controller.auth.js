const User = require("../models/model.user");
const Token = require("../models/model.token");
const hasher = require("../helpers/hasher");
const jwt = require("jsonwebtoken");

exports.attemptLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });

    const validPassword = await hasher.compare(password, user.password);
    if (validPassword) {
      const accessToken = generateAccessToken(generatePayload(user));
      const refreshToken = generateRefreshToken(generatePayload(user));
      try {
        await Token.create({ token: refreshToken, user_id: user._id });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          success: true,
          message: "Login Successful",
          data: {
            user: user,
            accessToken: accessToken,
          },
        });
      } catch (err) {
        return res.status(401).json({
          success: false,
          error: "Something went wrong",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Some error occurred while attempting the login!",
    });
  }
};

exports.getNewAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken == null)
    return res.status(401).json({
      success: false,
      error: "Refresh Token Not Found",
    });
  try {
    const token = await Token.findOne({ token: refreshToken });
    if (!token)
      return res.status(401).json({
        success: false,
        error: "Invalid refresh token",
      });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({
          success: false,
          error: "Refresh token expired",
        });
      if (user.sub != token.user_id)
        return res.status(403).json({
          success: false,
          error: "Invalid refresh token",
        });
      const accessToken = generateAccessToken(generatePayload(user));
      return res.json({
        success: true,
        message: "Access token created",
        data: {
          accessToken: accessToken,
        },
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
};

function generatePayload(user) {
  return {
    sub: user._id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000) - 30,
  };
}

function generateAccessToken(payload) {
  // expires after 15-30 min (9000 seconds = 15 minutes)
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "180s",
  });
}

function generateRefreshToken(payload) {
  // expires after 1 day
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

// require('crypto').randomBytes(64).toString('hex');
