const express = require('express');
const router = express.Router();
const FavoriteBook = require('../models/favoriteBook');
const mongoose = require('mongoose');
const moment = require('moment');
router.get('/', (req,res,next) => {

    FavoriteBook.find()
    .select('bookId')
    .exec()
    .then(docs => {

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
    const favoriteBook = new FavoriteBook({
        _id: new mongoose.Types.ObjectId(),
        bookId: req.body.bookId,
    });
    favoriteBook.
    save().
    then(result => {
        console.log(res);
        res.status(201).json({
            favoriteBook: {
                _id: new mongoose.Types.ObjectId(),
                bookId: result.bookId
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

router.get('/:favoriteBookId',(req,res,next) => {
    const favoriteBookId = req.params.favoriteBookId;
    FavoriteBook.findById(favoriteBookId)
    .select('_id bookId ')
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

router.patch('/:favoriteBookId', (req,res,next) => {
    const id = req.params.FavoriteBookId;
    const updateOps = {};

    for( const operations of req.body){
        updateOps[operations.propName] = operations.value;
    }
    FavoriteBook.updateOne({_id: id}, {$set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'FavoriteBookId updated',
        });
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
});
router.delete('/:FavoriteBookId', (req,res,next) => {
    const id = req.params.FavoriteBookId
    FavoriteBook.remove({bookId: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "FavoriteBookId deleted"
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
