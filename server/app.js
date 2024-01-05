const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./schema/schema')
const app = express()
app.use(cors())
//connect database
const DB= 'mongodb+srv://shavoddin54:v4GBJjGFtwqp0LR1@cluster0.fyqazr9.mongodb.net/GQL?retryWrites=true&w=majority'

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log(`Server is listening at http://localhost:4000/`);
})