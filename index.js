import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import multer from 'multer'
import mongoose from 'mongoose';
import booksRoute from './routes/books.js';
import bodyParser from 'body-parser'
 const API_KEY = "Ringuyeneza"


const port = 4000

const app  = express()

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middle ware to Validate API KEy

const verifyAPIKey = (req, res, next) => {
    const apiKey = req.get('key'); // Get the API key from the request headers
  
    if (apiKey === API_KEY) {
      // API key matches, proceed to the route handler
      next();
    } else {
      // API key doesn't match, send a 401 Unauthorized response
      res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
    }
  };



app.use("/images" ,express.static(path.join(__dirname,"images")));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.urlencoded({extended : true}))


// Data Base connection  

try {
    await mongoose.connect(`${process.env.DB_URL}books`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } );
    console.log("Successfully Connected To Database ");

} catch (error) {
    console.log(error);
}



app.use(verifyAPIKey);
app.use('/create', booksRoute);
app.use('/books', booksRoute);
app.use('/book', booksRoute)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})