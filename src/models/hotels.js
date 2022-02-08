import mongoose from 'mongoose'

const hotelsCollection = 'hoteles'

const hotelsSchema = new mongoose.Schema({

  name: { type: String, require: true },
  lastName: { type: String, require: true },
  mail: { type: String, require: true },
  nameHotel: { type: String, require: true },
  comment: { type: String, require: true }

})

export default mongoose.model(hotelsCollection, hotelsSchema)