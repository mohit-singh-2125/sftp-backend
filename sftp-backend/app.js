
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const read=require('./read')
// const MYSQL_CONFIG = require('./config/components/mysql');
 
// const index =require('./src/controllers/v1/masters/index');
// let { listCronTickets,weeklyTicket } = require("./src/utility/scheduler/scheduler");
// let {getEc2ConfManagement, getS3ConfManagement, getIamConfManagement} = require("./src/controllers/v1/masters/confManagement");
// var schedule = require('node-schedule');
const app = express();
const today = new Date();
// const { PORT } = process.env;
 const PORT = 3001;

// var j = schedule.scheduleJob('*/10 * * * *', listCronTickets);
// var j = schedule.scheduleJob('0 0 * * FRI', weeklyTicket);

// getEc2ConfManagement();
// getS3ConfManagement();
// getIamConfManagement();
// var ec2ConfMgmt = schedule.scheduleJob('0 0 */12 * * *', getEc2ConfManagement);
// var s3ConfMgmt = schedule.scheduleJob('0 0 */12 * * *', getS3ConfManagement);
// var iamConfMgmt = schedule.scheduleJob('0 0 */12 * * *', getIamConfManagement);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// MYSQL_CONFIG.bootstrap();

app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});

app.use(function (req, res, next) {

    next();
});

app.use("/", read);

module.exports = app;