export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS
    sameSite: "Strict", // Prevent CSRF
  };

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      message,
      token
    });
};
