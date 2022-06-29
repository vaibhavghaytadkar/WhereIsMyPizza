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

const Emitter= require('events');

//database connection 
// const url= 'mongodb://localhost/WhereIsMyPizaa';
const url= process.env.MONGO_CONNECTION_URL;



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
        if (err){
          console.log(" Not Connected to Database...");
          throw err;
          
        } 
        console.log("Connected to Database...");
      }
      );
     
      
      //session store
      
let mongoStore=  MongoDbStore.create({
    mongoUrl:url,
    // dbName: WhereIsMyPizza,
    mongooseConnection:mongoose.connection,
    collection:'sessions'
})

//event emitter
const eventEmitter =new Emitter();
app.set('eventEmitter',eventEmitter)

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
require('./routes/web')(app);
app.use((req,res)=>{
  res.status(404).render('errors/404')
})


const server= app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})


//Socket

const io = require('socket.io')(server);

io.on('connection',(socket)=>{
  //join a separate room

  // console.log('socket id ',socket.id)
  socket.on('join',(orderId)=>{
    // console.log(orderId);

    socket.join(orderId)
  })
})

eventEmitter.on('orderUpdated',(data)=>{
   io.to(`order_${data.id}`).emit('orderUpdated',data);
})

eventEmitter.on('orderPlaced',(data)=>{
  io.to('adminRoom').emit('orderPlaced',data)
})