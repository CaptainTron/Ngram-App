const { sequelize } = require("../mysql_connection/connection")
const { DataTypes } = require("sequelize");

const logs = sequelize.define("connection_logs", {
    IP_Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

sequelize.sync().then(() => {
    console.log('Tables created successfully!');
}).catch((error) => {
    console.error('Unable to create tables : ', error);
});


// This One Will Query IP logs in sql Database
const Get_IPlogs = async (IP) => {
    try {
        let data = await logs.findAll({
            where: {
                IP_Address: IP
            }
        })
        return data;
    } catch (error) {
        console.log("ERROR AT LOGS GET_IP", error.message);
        return error.message;
    }
}

// Post IP logs into Sql Database
const Post_IPlogs = async (IP) => {
    try {
        let data = await logs.create({
            IP_Address: IP,
            count: 1
        })
        return data;
    } catch (err) {
        console.log("ERROR in Post_IP", err.message);
        return err.message;
    }
}

// update count
const Update_IPlogs_Count = async (IP) => {
    try {
        let data = await logs.update(
            { count: sequelize.literal('count + 1') },
            { where: { IP_Address: IP } }
        )
        return data
    } catch (err) {
        console.log("ERROR in Update_IPlogs_count", err.message);
        return err.message;
    }
}

module.exports = { logs, Get_IPlogs, Post_IPlogs, Update_IPlogs_Count };