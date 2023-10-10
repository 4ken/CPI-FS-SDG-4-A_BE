const authorize = (role) => (req, res, next) => {
  if (role !== req.user.peran) {
    res.status(403).json({
      error: 'Akses ditolak',
    });
  } else {
    next();
  }
};

export default authorize;
