const adminMiddleware = (req, res, next) => {
  try {
    const isAdmin = req.user.role;

    if (isAdmin === "ADMIN") {
      next();
    } else {
      return res
        .status(403)
        .json({ msg: "Access Denied !! User is not admin" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = adminMiddleware;
