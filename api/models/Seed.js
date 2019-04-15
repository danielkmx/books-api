const Book = require('./book');
const mongoose = require('mongoose');
const request = require('request');
const moment = require('moment');
require('dotenv').config();



const getBooks = async (type) => {
    return new Promise((resolve,reject) => {
        var options = {
            url: 'https://www.googleapis.com/books/v1/volumes?q='  + type,
            method: 'GET'
        }
        request(options, function (error, response, body) {
            console.log(options)
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body).items);
            } else {
                console.log(error)
                reject(error);
            }
        });
    });  


}
    const Seed =  async () => {   
        mongoose.connect('mongodb://danielkmx:database123@ds237955.mlab.com:37955/desafio_node',{ useNewUrlParser: true });
        const books1 = await getBooks('History');

        books1.forEach((book,index) => {
            if(index > 10) return;
            const newbook = new Book({
                _id: new mongoose.Types.ObjectId(),
                Name: book.volumeInfo.title,
                Author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Author not defined',
                Description: book.volumeInfo.description,
                PageCount: book.volumeInfo.pageCount,
                ImgURL: book.volumeInfo.imageLinks.smallThumbnail,
                Rating: Math.random() * (5 - 1 + 1) + 1,
                RatingDetails: Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
                RegisterDate: moment().format('YYYY-MM-DD[T]HH:mm:ss')

            })
            newbook.save();
        })
      const books2 = await getBooks('computer science');
      books2.forEach((book,index) => {
            if(index > 10) return;
            const newbook = new Book({
                _id: new mongoose.Types.ObjectId(),
                Name: book.volumeInfo.title,
                Author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Author not defined',
                Description: book.volumeInfo.description,
                PageCount: book.volumeInfo.pageCount,
                ImgURL: book.volumeInfo.imageLinks.smallThumbnail,
                Rating: Math.random() * (5 - 1 + 1) + 1,
                RatingDetails: Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
                RegisterDate: moment().format('YYYY-MM-DD[T]HH:mm:ss')

            })
            newbook.save();
        })
        const books3 = await getBooks('romance');
        books3.forEach((book,index) => {
            if(index > 10) return;
            const newbook = new Book({
                _id: new mongoose.Types.ObjectId(),
                Name: book.volumeInfo.title,
                Author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Author not defined',
                Description: book.volumeInfo.description,
                PageCount: book.volumeInfo.pageCount,
                ImgURL: book.volumeInfo.imageLinks.smallThumbnail,
                Rating: Math.random() * (5 - 1 + 1) + 1,
                RatingDetails: Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
                RegisterDate: moment().format('YYYY-MM-DD[T]HH:mm:ss')

            })
            newbook.save();
        })
        console.log('database seeded');
    
    }
  Seed();