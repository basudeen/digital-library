const express = require('express');
const router = express.Router();
const Authcontroller = require('../controllers/AutherController');
const Bookcontroller = require('../controllers/BookController');

router.post('/author', Authcontroller.Createauthor);
router.get('/author', Authcontroller.Getauthor);
router.patch('/author/:id', Authcontroller.Updateauthor);
router.delete('/author/:id', Authcontroller.Deleteauthor);

router.post('/book', Bookcontroller.Createbook);
router.get('/book', Bookcontroller.GetBook);
router.patch('/book/:id', Bookcontroller.UpdateBook);
router.delete('/book/:id', Bookcontroller.DeleteBook);

module.exports = router;