const checkRole = (role) => {
  return (req, res, next) =>{
    const user = req.user;
  
    if (role === "superadmin") {
      if(user.role === role) return next();
      else return res.status(403).json({message:"Permission denied"});
    } else if (role === "manager") {
      if (user.role === "superadmin" || user.role === role) return next();
      else return res.status(403).json({message: "Permission denied"});
    } else if (role === "user") {
      if (user.role === role) return next();
      else return res.status(403).json({message: "Permission denied"})
    } else {
      return res.status(403).json({message: "Permission denied"})
    }
  }
};

module.exports = checkRole;