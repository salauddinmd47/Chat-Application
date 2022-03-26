//external import
const express =  require('express');
const dotenv  = require('dotenv');
const path = require('path');
const mongoose = require('mongoose'); 
const cookieParser = require('cookie-parser'); 
const internal = require('stream');


// internal import 
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter')
const usersRouter = require('./router/usersRouter')
const inboxRouter = require('./router/inboxRouter');
const decorateHTMLResponse = require('./middlewares/common/decorateHTMLResponse');


const app = express();
dotenv.config();
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log('database connection successfully'))
.catch((err)=> console.log(err))

// request parser 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//  view engine setup 
app.set('view engine', 'ejs');

// set static folder 
app.use(express.static(path.join(__dirname,'public')))

// cookie parser 
app.use(cookieParser(process.env.COOKIE_SECRET))

// routing setup
app.use('/', decorateHTMLResponse('Login'), loginRouter)
app.use('/users',decorateHTMLResponse('Users'),  usersRouter)
app.use('/inbox',decorateHTMLResponse('Inbox'),inboxRouter)

// 404 not found handler 
app.use(notFoundHandler)

// common error handler 
app.use(errorHandler)

app.listen(process.env.PORT, ()=>console.log(`app listening port ${process.env.PORT}`))