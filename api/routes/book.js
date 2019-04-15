const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const mongoose = require('mongoose');
const moment = require('moment');
router.get('/', (req,res,next) => {

    Book.find()
    .select('Name Description Rating RatingDetails Reviewers PageCount Author ImgURL')
    .exec()
    .then(docs => {


            docs.map(doc => { return {...doc._doc, request: { 
                type: 'GET',
                url: 'https://quiet-beyond-95506.herokuapp.com/books/' + doc._id
            }}})
            res.status(200).json({
                count: docs.length,
                books: docs
            });
    })
    .catch(err => {
        res.json(404).json({
            message: 'No entries found'
        })
    })
    
});



router.post('/',  (req,res,next) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        imgURL: req.body.imgURL,
        Name: req.body.Name,
        Description: req.body.Description,
        RatingDetails: req.body.RatingDetails,
        Rating: req.body.Rating,
        Reviewers: req.body.Reviewers,
        Author: req.body.Author,
        RegisterDate: moment().format('YYYY-MM-DD[T]HH:mm:ss')
        
    });
    book.
    save().
    then(result => {
        console.log(res);
        res.status(201).json({
            book: {
                _id: new mongoose.Types.ObjectId(),
                imgURL: result.imgURL,
                Name: result.Name,
                Description: result.Description,
                Rating: result.Rating,
                RatingDetails: result.RatingDetails,
                Reviewers: result.Reviewers,
                Author: result.Author,
                PublishDate: result.PublishDate,
                RegisterDate: result.RegisterDate,
        request: { 
            type: 'GET',
            url: 'http://localhost:3000/books/' + result._id
        }
            } 
        })
    }).
    catch(err => { 
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    
});

router.get('/:bookId',(req,res,next) => {
    const bookId = req.params.bookId;
    Book.findById(bookId)
    .select('Name Description Rating RatingDetails Reviewers ImgURL PageCount    Author _id ')
    .exec()
    .then(doc => {           
        if(doc) res.status(200).json(doc);
        else res.status(404).json({message: 'book not found'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
});

router.patch('/:bookId', (req,res,next) => {
    const id = req.params.bookId;
    const updateOps = {};

    for( const operations of req.body){
        updateOps[operations.propName] = operations.value;
    }
    Book.updateOne({_id: id}, {$set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Book updated',
            request: {
                type: 'GET',
                url: 'https://quiet-beyond-95506.herokuapp.com/book/' + id
            }
        });
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
});
router.delete('/:bookId', (req,res,next) => {
    const id = req.params.bookId
    Book.remove({_id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Book deleted"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;
