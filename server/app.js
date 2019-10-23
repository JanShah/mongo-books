const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const port = 4000;
const app = express();
const cors = require('cors');

const schema = require('./schema/schema.js');
//cross origin requests
app.use(cors());

mongoose.connect('mongodb://localhost/books-list', {useNewUrlParser:true});
mongoose.connection.once('open',()=>{
    console.log('DB Connected');
});



//handle graphql requests middleware
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));


//open port
app.listen(port,()=>
    console.log('listening on port:',port)
);

