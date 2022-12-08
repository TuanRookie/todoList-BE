import express from "express";
import apiController from "../controllers/apiController"
import multer from "multer"
import path from "path"
const storage = multer.diskStorage({
    destination: './src/public',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

})

const upload = multer({
    storage: storage
})

let route = express.Router();

const initApiRoute = (app) => {
    route.get('/books', apiController.allBook);
    route.post('/create-new-book', apiController.createNewBook);
    route.put('/updates-book', apiController.updateBook);
    route.get('/detail-book/:id', apiController.detailBook);
    route.delete('/delete-book/:id', apiController.deleteBook);
    return app.use('/api', route);
}
export default initApiRoute;