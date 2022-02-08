import mongoose from 'mongoose'
import dotenv from './dotenv.js'

export const conectarDB = async () => {
    try {
  
      await mongoose.connect(dotenv.BASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      console.log(`Base de datos conectada`)
    } catch (e) {
      console.log(`error ${e}`)
      process.exit(1)
    }
  }