const express = require('express')
const app = express();
require('dotenv').config();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const path = require('./Router/Router')
app.use('/', path);


// Connection Strings Goes here ----------> 
const { connect_sql } = require("./mysql_connection/connection")
const connectDB = require("./mongodb_connection/mongodb")
const PORT = process.env.PORT || 3000
const StartServer = async () => {
    try {
        await connect_sql();
        await connectDB(process.env.MONGO_DB_URL)
        app.listen(PORT, () => console.log(`Server Started at port ${PORT}....`))
    } catch (err) {
        console.log("Could Not Start Server 😥😥", err)
    }
} 
StartServer();



