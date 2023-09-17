const { sequelize } = require("../mysql_connection/connection")
const { DataTypes } = require("sequelize");

const text_model = sequelize.define('text_logs', {
    IP_Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    texts: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
// This One Will Post text into sql database
const Post_text = async (IP, text) => {
    try {
        let data = await text_model.create({
            IP_Address: IP.toString(),
            texts: text.toString()
        })
        return data;
    } catch (err) {
        console.log("ERROR in Post_text", err.message);
        return err.message;
    }
}

// This one will get a single text
const Get_Alltext = async (IP) => {
    try {
        let data = await text_model.findAll({
            where: {
                IP_Address: IP
            }
        })
        return data;
    } catch (error) {
        console.log("ERROR AT LOGS GETIP", error.message);
        return error.message;
    }
}

const Get_Atext = async (IP) => {
    try {
        let data = await text_model.findOne({
            where: {
                IP_Address: IP
            }
        })
        return data;
    } catch (error) {
        console.log("ERROR AT LOGS GETIP", error.message);
        return error.message;
    }
}

module.exports = { Post_text, Get_Alltext, Get_Atext }