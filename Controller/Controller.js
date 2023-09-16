const logsSchema = require("../MongoDB_models/logmodels");
const textSchema = require("../MongoDB_models/textModels");

// Connect to sql Table;
const { Get_IPlogs, Post_IPlogs, Update_IPlogs_Count } = require("../Mysql_Models/logs");
const { Post_text, Get_Alltext, Get_Atext } = require("../Mysql_Models/text");


// This Will Fetch Records From Sql Database
const GetSql_records = async (req, res) => {
    const { IP } = req.params;
    try {
        let data = await Get_IPlogs(req.ip);
        if (!data) {
            data = await Post_IPlogs(req.ip);
        }
        let text = await Get_Alltext(req.ip);
        res.status(200).json({ logs: data, text: text })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Failed" })
    }
}

// This One Will Post Text In sql Model
const Posttext_inSql = async (req, res) => {
    const { text } = req.body;
    try {
        let data = await Post_text(req.ip, text);
        res.status(200).json({ status: data })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ status: err.message })
    }
}

// This will get Strings From teh backend server 
const fetch = require("node-fetch");
const ReturnNgramString = async (IP) => {
    const data = await textSchema.find({ IP_address: IP }).sort({ createdAt: "descending" });
    try {
        if (data.length >= 2) {
            let text1 = data[0].text, text2 = data[1].text
            let res_data = await fetch(`http://localhost:8000/api/cngrams/?string1=${text1}&string2=${text2}&n=2`)
            let datas = await res_data.json()
            console.log(datas)
            return datas;
        } else {
            return { similarity: "Please Enter One more string to get ngram!!" }
        }
    } catch (err) {
        return err.message
    }
}

// This is Main api, used in frontend
const Setlogs = async (req, res) => {
    try {
        let mongo_logs = await logsSchema.findOne({ IP_address: req.ip })
        let sql_logs = await Get_IPlogs(req.ip)
        // This One for Logs Records
        if (mongo_logs === null || sql_logs.length === 0) {
            sql_logs = await Post_IPlogs(req.ip);
            mongo_logs = await logsSchema.create({ IP_address: req.ip, hits: 1 })
            // Since It will also not present in Sql Database, post data into sql database
        } else {
            mongo_logs = await logsSchema.findOneAndUpdate({ IP_address: mongo_logs.IP_address }, { $inc: { 'hits': 1 } }, { new: true, runValidators: true })
            sql_logs = await Update_IPlogs_Count(req.ip);
        }
        // Fetch all the logs from sql database
        sql_logs = await Get_IPlogs(req.ip)
        console.log("Request From: ---> ", req.ip, ", No.of Hits: ---> ", mongo_logs.hits)

        const { value, name } = req.body;
        // This One for Text Records
        let mongotext = await textSchema.create({ IP_address: req.ip, text: value })
        let sqltext = await Post_text(req.ip, value);
        let ngram = await ReturnNgramString(req.ip);
        // res.status(200).json({ status: "Successfully Updated!", Iplogs: { mongo_logs, sql_logs }, text_created: { mongotext, sqltext }, ngram });
        res.status(200).json({ ngram });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: error.message });
    }
}

module.exports = { Setlogs, GetSql_records, Posttext_inSql, ReturnNgramString }
