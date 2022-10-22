const schema = require('./schema/schema');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const express_graphql = require('express-graphql');
const spicesRouter = require('./routes/spices.js');
const usersRouter = require('./routes/users.js');


const dotenv = require('dotenv');
//middleware app.use functions
//parsing json, etc
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//routers
app.use('/spice', spicesRouter);
app.use('/users', usersRouter);

// Ray
const log = (req, res, next) => {
  console.log('IP:', req.ip)
  next()
}
const logAfter = (req, res, next) => {
  console.log('after resolver')
  next();
}
app.use(log)
//
app.use(logAfter);

app.use('/graphql', express_graphql.graphqlHTTP({
  schema: schema,
  graphiql: true
}))






// ERROR HANDLERS
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});
  
app.use((req, res) => res.status(404).send('404, page/route does not exist !'));
// app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

app.listen(3000, () => {
  console.log('listening on port 3000')
});


dotenv.config();

module.exports = app;