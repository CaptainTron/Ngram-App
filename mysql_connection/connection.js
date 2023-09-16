const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize(
    'my-db',
    'vaibhav',
    'vaibhav',
    {
        host: 'localhost',
        port: 3000,
        dialect: 'mysql'
    }
);

const connect_sql = () => {
    return sequelize.authenticate()
        .then(() => console.log("Connection to Sql has been Established"))
        .catch((err) => console.error("Error in Connection with Sql Database", err))
}



module.exports = { connect_sql, sequelize }; 