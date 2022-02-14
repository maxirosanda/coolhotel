import * as controllerHotels from '../controllers/controllerHotels.js'

import {
    getUserController,
    loginLocalController,
    logoutController,
    registerLocalController
} from '../controllers/userController.js';

const routesHotels = (app) => {
    app.get('/hotels',controllerHotels.hotels)
    app.get('/hotel/:nameHotel',controllerHotels.hotel)
    app.post('/hotel',controllerHotels.createHotel)
    app.delete('/hotel',controllerHotels.del)
    app.put('/hotel',controllerHotels.update)

    app.get('/getuser', getUserController);
    app.get('/logout', logoutController);
    app.post('/register', registerLocalController);
    app.post('/login', loginLocalController);
}


export default routesHotels