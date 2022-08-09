const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
// console.log(uri);
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blogs');
const propertyRouter = require('./routes/property')
const insuranceRouter = require('./routes/insurance')
const chatRouter = require('./routes/chat');
const paymentRouter=require('./routes/payments');
const rentingRouter=require('./routes/renting');

app.use('/users', usersRouter);
app.use('/property', propertyRouter);
app.use('/blogs', blogRouter);
app.use('/chat', chatRouter);
app.use('/payments',paymentRouter);
app.use('/renting',rentingRouter);
app.use('/insurance',insuranceRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});