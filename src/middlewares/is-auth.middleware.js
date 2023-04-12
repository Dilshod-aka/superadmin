const {verify} = require("../utils/jwt");

const isAuth = (req, res, next) => {
    try{
        const token = req.headers.get("Authorization").split(" ")[1];
      
        if(!token) return res.status(403).json({message: "Permission denied"});

      const user = verify(token);

      req.user = user;

      next()
    } catch(error) {
        return res.status(403).json({message: "Permission Denied"});
    }
};

module.exports = isAuth;