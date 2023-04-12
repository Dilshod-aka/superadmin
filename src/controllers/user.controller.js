const Joi = require("joi");
const bcrypt = require("bcrypt");

const Users = require("../models/users");

const addUser = async(req, res) => {
   const {password, username, name, role} = req.body;
   const currentUser = req.user;
   if(
      currentUser.role === "manager" &&
   (role === "manager" || role === "superadmin")
   ) {
      return res.status(403).json({message: "Permission Denied"})
   }

   const schema = Joi.object({
      password: Joi.string().required(),
      username: Joi.string().alphanum().max(32).min(5).required(),
      name: Joi.string().alphanum().max(32).min(5).required(),
      role: Joi.string()
            .valid("superadmin", "manager", "user")
            .max(32)
            .min(5)
            .required(),
   });

   const {error} = schema.validate({password, username, name, role});
   if (error) return res.status(400).json({message: error.message});

   const user = await Users.findByUsername(username);
   if(user) return res.status(400).json({message: "User already exists!"})

   const hashedPass = await bcrypt.hash(password, 12); 

   const newUser = await Users.create(username, hashedPass, role, name);
   
   res.status(200).json({message: "Success", user: newUser})
};

const getUsers = async (req, res, next) => {
   const {
      user: {role},
   } = req;

   const users = await Users.find(role);

   res.status(200).json({message: "Success", users})
};

module.exports = {addUser, getUsers};