const fs = require("fs");
const path = require("path");
const bcrypt = require("../helpers/bcrypt");

const loginController = {
    index: (req,res)=>{
        return res.render("login",{title:"Login"});
    },
};

module.exports = loginController;