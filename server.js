const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true
});

mongoose.connection.once('open', ()=> {
    console.log('connedted to mongo db');
})
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
