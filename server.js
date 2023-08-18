require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/books');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.set('strictQuery', false);

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {

        console.log(error);
        process.exit(1);
    }
}

app.get('/', (req, res) => {

    res.send({ title: 'Books' });
});

app.get('/add-note', async (req, res) => {

    try {

        await Book.insertMany([
            {
                title: 'Sons of Tales',
                body: 'content 1'
            },
            {
                title: 'Need for Speed',
                body: 'content 2'
            }
        ]);

        res.send('Books added');

    } catch (error) {
        console.log(`error: ${error}`);
    }

});

app.get('/books', async (req, res) => {

    const book = await Book.find();

    if (book) {

        res.json(book);

    } else {

        console.log('something went wrong');
    }
});

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
});
