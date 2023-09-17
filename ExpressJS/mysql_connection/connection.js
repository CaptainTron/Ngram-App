require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize(
    process.env.DB,
    "vaibhav", 
    "vaibhav",
    {
        host: process.env.HOST, 
        port: process.env.SQLPORT,
        dialect: 'mysql'
    }
);

const connect_sql = () => {
    return sequelize.authenticate()
        .then(() => console.log("Connection to Sql has been Established"))
        .catch((err) => console.error("Error in Connection with Sql Database", err))
}



module.exports = { connect_sql, sequelize }; 