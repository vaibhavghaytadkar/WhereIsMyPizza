require('dotenv').config();


const express=require('express');

const app = express();
const ejs = require('ejs');
const path= require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000 

const mongoose=require('mongoose');

const session=require('express-session');

const flash = require('express-flash');


//session store
const MongoDbStore=require('connect-mongo');


const passport=require('passport');

//database connection 
const url='mongodb://localhost/WhereIsMyPizaa';



// const Connection = mongoose.connection;
// Connection.once('open', () =>{
  //     console.log('Database connected...');
  // }).catch(err =>{
    //     console.log('Connection Failed...')
    // });
    
    mongoose.connect(url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw err;
        console.log("Connected to Database...");
      }
      );

   
      
      //session store
      
let mongoStore=  MongoDbStore.create({
    mongoUrl:url,
    // dbName: WhereIsMyPizza,
    // mongooseConnection:mongoose.connection,
    collection:'sessions'
})


//session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    store:mongoStore,
    cookie:{maxAge:1000*60*60*24}
}))

   //passport config---it should be after session config
   const passportInit = require('./app/config/passport');
   passportInit(passport);
   app.use(passport.initialize());
   app.use(passport.session());


app.use(flash());


//Assets
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session ;
    res.locals.user = req.user ;
    next();
    
})

//set template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

//Routes
require('./routes/web')(app)


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
