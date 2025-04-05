const express = require('express');
const app = express();
const { config } = require('dotenv');
const authRoute = require('./routes/AuthRoute');
const dbconnection = require('./config/Db.js')
const cors = require('cors')
const getProfile = require('./routes/getProfile.js')
const CandidateRoute = require('./routes/CandidateRoute.js')
const AttendenceRoute = require("./routes/AttendenceRoute.js")
const LeaveRoute = require('./routes/LeaveRoute.js')
config();
app.use(express.json());
app.use(cors())
dbconnection();
const PORT = process.env.PORT || 3000;

app.use('/api',authRoute)
app.use('/api',getProfile)
app.use('/api',CandidateRoute)
app.use('/api',AttendenceRoute)
app.use('/api',LeaveRoute)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
})