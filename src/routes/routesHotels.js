import * as controllerHotels from '../controllers/controllerHotels.js'

const routesHotels = (app) => {
    app.get('/hotels',controllerHotels.hotels)
    app.get('/hotel/:nameHotel',controllerHotels.hotel)
    app.post('/hotel',controllerHotels.createHotel)
    app.delete('/hotel',controllerHotels.del)
    app.put('/hotel',controllerHotels.update)
}


export default routesHotels