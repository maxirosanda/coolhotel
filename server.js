import MongoStore from 'connect-mongo';
import { conectarDB } from './config/db.js'
import cookieParser from 'cookie-parser';
import dotenv from './config/dotenv.js'
import express from 'express'
import fileUpload from 'express-fileupload'
import methodOverride from 'method-override'
import morgan from 'morgan'
import passport from 'passport';
import passportLocal from './src/middlewares/passportLocal.js';
import path from 'path'
import routesHotels from './src/routes/routesHotels.js'
import session from 'express-session';

const app = express()
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        dotenv.BASE,
      ttl: 60
    }),
    secret: "123-456-789",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 600 },
    rolling: true,
  })
);

app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
passportLocal(passport);

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
   // dir for windows PC
    tempFileDir: path.join(__dirname, './tmp'),
  }),
);

conectarDB()
routesHotels(app)

app.listen(3000, () => {
    console.log(`el servidor esta corriendo en : http://localhost:${3000}`)
  })