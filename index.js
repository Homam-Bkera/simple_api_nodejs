
const express = require("express");
const path = require('path');

const app = express();
const cors = require('cors');

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const mongoose = require('mongoose');

const httpStatusText = require('./utils/httpStatusText')

const error = require('./utils/appError');

require('dotenv').config();

const url = process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
  console.log("mongoDB server started");
})

app.use(cors());
app.use(express.json());

const coursesRouter = require("./routes/courses.route"); 
const usersRouter = require("./routes/user.route"); 

app.use("/api/courses", coursesRouter);
app.use("/api/users",usersRouter );

// Global middleware  for not found router
app.all('*',(req,res)=>{
  return res.status(404).json({status : httpStatusText.ERROR, message:"This resource is not available"})
})

// global error handler
app.use((error,req,res,next)=>{
  res.status(error.statusCode||500).json({status:error.StatusText||httpStatusText.ERROR,message:error.message,code:error.statusCode||500,data:null})
});


app.listen(process.env.PORT||3001, () => {
  console.log("you app listening on port 3001");
});
