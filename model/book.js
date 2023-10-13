import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
        uniques: true,
        immutable: false,

    },
    image:{
        type: String,
        require: true,
        immutable: false,
    },
    author: {
        type: String,
        require: true,
        immutable: false,
    },
    pages: {
        type: Number,
        required: false,
        immutable: false,
    },

    price :{
        type: Number,
        require: true,
        immutable: false,
    }

    
}

,
{
    timestamps: true,
})


const Book = mongoose.model('Book', BookSchema);

export default Book