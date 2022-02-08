import express from 'express'
import morgan from 'morgan'
import path from 'path'
import methodOverride from 'method-override'
import fileUpload from 'express-fileupload'
import { conectarDB } from './config/db.js'
import routesHotels from './src/routes/routesHotels.js'

const app = express()
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 

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