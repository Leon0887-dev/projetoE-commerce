const db = require("../config/sequelize");
const Model = require("../models/Order");
const Relation = require("../models/UserAddress");
// const {UserAddress,Order} = require("../models");

const TesteDbController = {
    index: async (req, res)=>{
        const data = await Model.findAll({
            include: Relation,
        });
        console.log(data);
    }
};

module.exports = TesteDbController;