import express from "express";
import configViewEngine from "./configs/viewEngine";
import initApiRoute from "./route/apiBook";
import cookieParser from "cookie-parser";
import session from "express-session";
import initApiUser from "./route/apiUser";

require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
)



configViewEngine(app);
initApiRoute(app);
initApiUser(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})