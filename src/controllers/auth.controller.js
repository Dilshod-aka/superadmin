const Joi = require("joi");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const  {sign, verify} = require("../utils/jwt")

const loginC = async(req, res) => {
    const {username, password} =  req.body;

    const schema = Joi.object({
        username: Joi.string().alphanum().min(5).max(32).required(),
        password: Joi.string().required()
    });

    const {error} = schema.validate({username, password});
    if (error) return res.status(400).json({message: error.message});

    const user = await Users.findByUsername(username);
    if(!user) return res.status(404).json({message: "Incorrect username or password"});

    const verify = await bcrypt.compare(password, user.user_password)
    if(!verify) return res.status(404).json({message:"Incorrect username or password"});

    console.log(user);

    const token = sign({id: user.user_id, role: user.user_role });
     res.status(200).json({message:"Success", token})
    console.log(token);
};

module.exports = {loginC};