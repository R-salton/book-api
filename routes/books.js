import { Router } from "express";

const booksRoute = Router();
import Book from "../model/book.js";
import multer from "multer";
import path from "path";



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images'); // Store the files in the 'images' folder
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname); // Get the file extension
      const filename = Date.now() + extname; // Set a unique filename with extension
      cb(null, filename);
    },
  });
  

const upload = multer({storage}); 



// Creating a Book

booksRoute.post('/', upload.single("image"),async(req,res) =>{

    

    
    try {
        const { name, author, pages, price } = req.body;
        const extname = path.extname(req.file.originalname);
        const image = `/images/${req.file.filename}${extname}`;  // Use the uploaded file's filename
    
        const newBook = new Book({ name, author, pages, price, image });
    
        const savedBook = await newBook.save();

        res.status(200).json(savedBook)


        
    } catch (error) {
        res.status(401).json(error)
    }
})


// Get all Books
booksRoute.get('/',async(req,res) =>{

   
 
    try {

            const Books = await Book.find();
            res.status(200).json(Books)

    } catch (error) {
        res.status(401).json(error)
    }
})


    // get One Boook by Id Or by name

booksRoute.get('/:id', async(req,res) =>{

    try {

        const book = await Book.findById(req.params.id)
        console.log(book);
        res.status(200).json(book);
        
    } catch (error) {
        res.status(401).json({error: "Book Not found"})
    }
})



// Update Book

booksRoute.put('/:id',upload.single("image"), async(req,res) =>{

    try {

        const { name, author, pages, price } = req.body;
        const extname = path.extname(req.file.originalname);
        const image = `/images/${req.file.filename}${extname}`;  // Use the uploaded file's filename
    
        const UpdatedBook = await Book.findByIdAndUpdate(req.params.id, 
            {
                $set: {
                    name,
                    author,
                    price,
                    pages,
                    image,
                }
            },
            {
                new : true
            })

            res.status(200).json(UpdatedBook)
    } catch (error) {
        res.status(501).json(error)
    }
})


// Delete Book Router
booksRoute.delete('/:id', async(req,res) =>{
    try {
        const deletedBook =  await Book.findByIdAndDelete(req.params.id)

        res.status(200).json({message: "Succefully Deleted Book",
        Book: deletedBook})

    } catch (error) {
        res.status(501).json(error)
    }
})
export default booksRoute