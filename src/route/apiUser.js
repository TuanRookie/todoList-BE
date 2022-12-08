import express from "express";
import apiControllerUser from "../controllers/apiControllerUser"

const route = express.Router();
const initApiUser = (app) => {
    route.post('/register', apiControllerUser.register);
    route.get('/login', apiControllerUser.loginAuth);
    route.post('/login', apiControllerUser.login);

    return app.use('/apiUser', route);
}
export default initApiUser;
