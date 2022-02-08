import Hotel from '../models/hotels.js'


export const hotels = async (req, res) => {
    try {
      const hotels = await Hotel.find({}).lean()
        res.status(200).json({hotels:hotels})
    } catch (e) { console.log(e) }
  }

  export const hotel = async (req, res) => {
    try {
      const hotel = await Hotel.find({nameHotel:req.params['nameHotel']}).lean()
        res.status(200).json({hotel:hotel})
    } catch (e) { console.log(e) }
  }

  export const createHotel = async (req, res) => {
    try {
      
      const hotelfound = await Hotel.find({nameHotel:req.body.nameHotel}).lean()
         if ((Object.entries(hotelfound).length != 0)) {
           return res.status(200).json({message:"El Hotel ya esta cargado en la base de datos"})
         }

      const hotel = new Hotel(req.body)
      await hotel.save()
      res.status(200).json({message:"hotel creado"})

    } catch (e) { console.log(e) }
  }

  export const del = async (req,res) =>{
    try {
      const hotelfound = await Hotel.find({_id:req.body._id}).lean()
         if ((Object.entries(hotelfound).length === 0)) {
           return res.status(200).json({message:"No se encontro el hotel"})
         }
         await Hotel.deleteOne({ _id: req.body._id })
         res.status(200).json({messsage:"Hotel Borrado"})
     
   } 
   catch (e) { console.log(e) }  
   
  }

  export const update = async (req,res) =>{
    let hotel = {}
    if(req.body.name) hotel.name = req.body.name
    if(req.body.lastName) hotel.lastName=req.body.lastName
    if(req.body.mail) hotel.mail = req.body.mail
    if(req.body.nameHotel) hotel.nameHotel = req.body.nameHotel
    if(req.body.comment) hotel.comment = req.body.comment
    try {
      const hotelfound = await Hotel.find({_id:req.body._id}).lean()
          if ((Object.entries(hotelfound).length === 0)) {
            return res.status(200).json({message:"no se encontro el Hotel"})
          }
      await Hotel.findOneAndUpdate(
        { _id: req.body._id },
        { $set: hotel},
        { new: true }
      )
    
      res.status(200).json({hotel:hotel})
      
    } 
    catch (e) { console.log(e) }

   
    
  }