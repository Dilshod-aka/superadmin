const {fetchOne, fetch} = require("../utils/pg");

const getUserByUsername = "select * from users where user_username = $1";
const createUser = "insert into users (user_username, user_password, user_role, user_name)values($1, $2, $3, $4) RETURNING *";

const getAll = "select * from users";
const getUsers = 
   "select * from users where user_role = 'manager' or user_role = 'user'";

const findByUsername = (username) => fetchOne(getUserByUsername, username);
const create = (username, password, role, name) => 
          fetchOne(createUser, username, password, role, name);


const find = (role) => fetch(role === "superadmin" ? getAll : getUsers);

module.exports = {
    findByUsername,
    create,
    find,
};